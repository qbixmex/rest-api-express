import { Router } from "express";
import TodoController from "./todo.controller";

class TodoRoutes {

  static get routes(): Router {

    const router = Router();

    const todoController = new TodoController();
    
    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodo);
    router.patch('/:id', todoController.update);
    router.delete('/:id', todoController.deleteTodo);

    return router;

  }

}

export default TodoRoutes;
