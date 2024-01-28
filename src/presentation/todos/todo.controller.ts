import crypto from "node:crypto";
import { Request, Response } from "express";
import { todos } from "./data/todos";
import prisma from './data/postgres';

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

class TodoController {

  // TODO: Implement Dependency Injection from Repository
  constructor() {}

  public getTodos = (_request: Request, response: Response) => {
    return response.status(200).json(todos);
  };

  public getTodoById = (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const id = request.params.id;

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
      return response.status(404).json({
        ok: false,
        error: `Todo with id: ${id}, not found`,
      });
    }

    return response.json({
      ok: true,
      todo,
    });
  };

  public createTodo = async (
    request: Request<{}, { title: string }>,
    response: Response
  ) => {
    const payload = request.body;

    if (!payload.title) {
      return response.status(400).json({
        ok: false,
        error: "title is required !",
      });
    }

    const todo = await prisma.todo.create({
      data: {
        title: payload.title,
      },
    });

    return response.status(201).json(todo);
  };

  public updateTodo = (
    request: Request<{ id: string }, {}, {
      title?: string;
      done?: boolean;
    }>,
    response: Response
  ) => {
    const id = request.params.id;

    const todoFound = todos.find(todo => todo.id === id);

    if (!todoFound) {
      return response.status(404).json({
        ok: false,
        error: `Todo with id: ${id}, not found`,
      });
    }

    const { title, done } = request.body;

    //* Update todo in todos array
    todoFound.title = title ?? todoFound.title;
    todoFound.done = done ?? todoFound.done;
    todoFound.updatedAt = new Date() ?? todoFound.updatedAt;

    return response.json({
      ok: true,
      todo: todoFound,
    });
  };

  public deleteTodo = (
    request: Request<{ id: string }>,
    response: Response
  ) => {
    const id = request.params.id;

    const todoFound = todos.find(todo => todo.id === id);

    if (!todoFound) {
      return response.status(404).json({
        ok: false,
        error: `Todo with id: ${id}, not found`,
      });
    }

    const todoIndex = todos.indexOf(todoFound);
    todos.splice(todoIndex, 1);

    return response.json({ ok: true });
  }

};

export default TodoController;
