import { Request, Response } from "express";
import { todos } from "./data/todos";

class TodoController {

  // TODO: Implement Dependency Injection from Repository
  constructor() {}

  public getTodos(_request: Request, response: Response) {
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

  public update = (
    request: Request,
    response: Response
  ) => {
    return response.json({
      message: "Update Todo not implemented."
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
