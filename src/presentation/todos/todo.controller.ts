import { Request, Response } from "express";
import { todos } from "./data/todos";

class TodoController {

  // TODO: Implement Dependency Injection from Repository
  constructor() {}

  public getTodos(_request: Request, response: Response) {
    return response.status(200).json(todos);
  }

  public getTodo(request: Request, response: Response) {
    response.status(200).json({ message: "Get Todo not implemented." });
  }

  public update(request: Request, response: Response) {
    response.status(200).json({ message: "Update Todo not implemented." });
  }

  public deleteTodo(request: Request, response: Response) {
    response.status(200).json({ message: "Delete Todo not implemented." });
  }

}

export default TodoController;
