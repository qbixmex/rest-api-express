import { Router } from "express";
import TodoController from "./todo.controller";

class TodoRoutes {

  static get routes(): Router {

    const router = Router();

    const todoController = new TodoController();
    
    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.post('/', todoController.createTodo);
    router.patch('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;

  }

}

export default TodoRoutes;
