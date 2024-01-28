import { Request, Response } from "express";
import prisma from './data/postgres';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos/todos';
import { TodoRepository } from "../../domain";

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

    const todoEntity = await this.todoRepository.create(createTodoDTO!);

    return response.status(201).json(todoEntity);
  };

  public getTodos = async (
    _request: Request,
    response: Response
  ) => {
    const todos = await this.todoRepository.getAll();
    return response.status(200).json(todos);
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
      return response.status(404).json({ error });
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

    const [ error, updateTodoDTO ] = UpdateTodoDTO.create({
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
      return response.status(404).json({ error });
    }

  };

  public deleteTodo = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const todoId = request.params.id;

    try {
      const deletedTodo = await this.todoRepository.deleteById(todoId);
      return response.json({
        message: `Todo deleted successfully 👍✅`,
        deletedTodo
      });
    } catch (error) {
      return response.status(404).json({ error });
    }

  }

};

export default TodoController;
