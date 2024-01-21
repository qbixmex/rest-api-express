import { Router, Request, Response } from "express";
import { todos } from "../data/todos";

class AppRoutes {
  static get routes(): Router {
    const router = Router();
    
    router.get('/api/todos', (_request: Request, response: Response) => {
      return response.json(todos);
    });

    return router;
  }
}

export default AppRoutes;
