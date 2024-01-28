import { Request, Response } from 'express';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos/todos';
import { TodoRepository } from '../../domain';
import {
  GetTodosUseCase, GetTodoUseCase, CreateTodoUseCase, UpdateTodoUseCase, DeleteTodoUseCase
} from '../../domain/use-cases';

class TodoController {

  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  public createTodo = (
    request: Request<{}, { title: string }>,
    response: Response
  ) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(request.body);

    if (error) {
      return response.status(400).json({ error });
    }

    new CreateTodoUseCase(this.todoRepository)
      .execute(createTodoDTO!)
      .then(todo => response.status(201).json(todo))
      .catch(error => response.status(400).json({ error }));
  };

  public getTodos = (
    _request: Request,
    response: Response
  ) => {
    new GetTodosUseCase(this.todoRepository)
      .execute()
      .then(todos => response.status(200).json(todos))
      .catch(error => response.status(400).json({ error }));
  };

  public getTodoById = (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    new GetTodoUseCase(this.todoRepository)
      .execute(request.params.id)
      .then(todo => response.json(todo))
      .catch(error => response.status(404).json({ error }));
  };

  public updateTodo = (
    request: Request<{ id: string }, {}, {
      title?: string;
      completedAt?: Date;
    }>,
    response: Response
  ) => {
    const [ error, updateTodoDTO ] = UpdateTodoDTO.create({
      ...request.body,
      id: request.params.id,
    });

    if (error) {
      return response.status(400).json({ error });
    }

    new UpdateTodoUseCase(this.todoRepository)
      .execute(updateTodoDTO!)
      .then(todo => response.json(todo))
      .catch(error => response.status(404).json({ error }));
  };

  public deleteTodo = (
    request: Request<{ id: string }>,
    response: Response
  ) => {

    new DeleteTodoUseCase(this.todoRepository)
      .execute(request.params.id)
      .then(todo => response.json({
        message: `Todo deleted successfully 👍✅`,
        todoTodo: todo
      }))
      .catch(error => response.status(404).json({ error }));

  }

};

export default TodoController;
