import crypto from "node:crypto";
import { Request, Response } from "express";
import { todos } from "./data/todos";

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
  }

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
  }

  public createTodo = (
    request: Request<{}, { title: string }>,
    response: Response
  ) => {
    const { title } = request.body;

    if (!title) {
      return response.status(400).json({
        ok: false,
        error: "title is required !",
      });
    }

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //* Add newTodo to todos array
    todos.push(newTodo);

    return response.status(201).json({
     ok: true,
     todo: newTodo,
    });
  }

  public updateTodo = (
    request: Request<{ id: string }, {}, {
      title?: string;
      done?: boolean;
    }>,
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

    const { title, done } = request.body;

    //* Update todo in todos array
    todo.title = title ?? todo.title;
    todo.done = done ?? todo.done;
    todo.updatedAt = new Date() ?? todo.updatedAt;

    return response.json({
      ok: true,
      todo,
    });
  }

  public deleteTodo = (
    request: Request,
    response: Response
  ) => {
    return response.json({
      message: "Delete Todo not implemented."
    });
  }

}

export default TodoController;
