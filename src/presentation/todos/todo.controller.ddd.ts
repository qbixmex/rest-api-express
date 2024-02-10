import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO, DeleteTodoDTO } from '../../domain/dtos/todos';
import { CustomError, TodoRepository } from "../../domain";
import { Prisma } from "@prisma/client";

class TodoController {

  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  public createTodo = async (
    request: Request<{}, { title: string }>,
    response: Response
  ) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(request.body);

    if (error) {
      return response.status(400).json({ error });
    }

    try {
      const todoEntity = await this.todoRepository.create(createTodoDTO!);
      return response.status(201).json(todoEntity);
    } catch (error) {
      this.handleError(response, error);
    }
  };

  public getTodos = async (
    _request: Request,
    response: Response
  ) => {
    try {
      const todos = await this.todoRepository.getAll();
      return response.status(200).json(todos);
    } catch(error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleError(response, error);
      }
    }
  };

  public getTodoById = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const todoId = request.params.id;
    try {
      const todo = await this.todoRepository.findById(todoId);
      return response.json(todo);
    } catch (error) {
      this.handleError(response, error);
    }
  };

  public updateTodo = async (
    request: Request<{ id: string }, {}, {
      title?: string;
      completedAt?: Date;
    }>,
    response: Response
  ) => {
    const todoId = request.params.id;

    const [ error, updateTodoDTO ] = UpdateTodoDTO.update({
      ...request.body,
      id: todoId,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {
      const updatedTodo = await this.todoRepository.updateById(updateTodoDTO!);
      return response.json(updatedTodo);
    } catch (error) {
      this.handleError(response, error);
    }

  };

  public deleteTodo = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const todoId = request.params.id;

    const [ error ] = DeleteTodoDTO.delete({
      id: todoId,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    try {
      const deletedTodo = await this.todoRepository.deleteById(todoId);
      return response.json({
        message: `Todo with id: ${deletedTodo.id} deleted successfully !`,
      });
    } catch (error) {
      this.handleError(response, error);
    }

  }

  private handleError(response: Response, error: unknown) {
    if (error instanceof CustomError) {
      response.status(error.statusCode).json({ error: error.message });
      return;
    }
    console.log(error);
    response.status(500).json('Unexpected error, check logs !');
  }

};

export default TodoController;
