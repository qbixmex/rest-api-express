import { Request, Response } from "express";
import prisma from './data/postgres';

class TodoController {

  // TODO: Implement Dependency Injection from Repository
  constructor() {}

  public getTodos = async (
    _request: Request,
    response: Response
  ) => {
    const todos = await prisma.todo.findMany();
    return response.status(200).json(todos);
  };

  public getTodoById = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const todoId = request.params.id;

    const todo = await prisma.todo.findFirst({
      where: { id: todoId }
    });

    if (!todo) {
      return response.status(404).json({
        error: `Todo with id: ${todoId}, not found ❗️`,
      });
    }

    return response.json(todo);
  };

  public createTodo = async (
    request: Request<{}, { title: string }>,
    response: Response
  ) => {
    const payload = request.body;

    if (!payload.title) {
      return response.status(400).json({ error: "title is required ❗️" });
    }

    const todo = await prisma.todo.create({
      data: {
        title: payload.title,
      },
    });

    return response.status(201).json(todo);
  };

  public updateTodo = async (
    request: Request<{ id: string }, {}, {
      title?: string;
      done?: boolean;
      completedAt?: Date;
    }>,
    response: Response
  ) => {
    const todoId = request.params.id;
    const payload = request.body;

    const foundTodo = await prisma.todo.findFirst({
      where: { id: todoId }
    });

    if (!foundTodo) {
      return response.status(404).json({
        error: `Todo with id: ${todoId}, not found ❗️`
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        title: payload.title ?? foundTodo.title,
        completedAt: payload.completedAt ?? foundTodo.completedAt,
        updatedAt: new Date(),
      }
    });

    return response.json(updatedTodo);
  };

  public deleteTodo = async (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const todoId = request.params.id;

    const todoFound = await prisma.todo.findUnique({
      where: {
        id: todoId
      }
    });

    if (!todoFound) {
      return response.status(404).json({
        error: `Todo with id: ${todoId}, not found ❗️`,
      });
    }

    await prisma.todo.delete({
      where: {
        id: todoId
      }
    });

    return response.json({
      message: `Todo with id: ${todoId} deleted successfully 👍✅`
    });
  }

};

export default TodoController;
