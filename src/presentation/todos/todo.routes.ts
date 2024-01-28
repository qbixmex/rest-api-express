import { Router } from "express";
import TodoController from "./todo.controller.ddd";
import { TodoDataSourceImplementation, TodoRepositoryImplementation } from "../../infraestructure";

class TodoRoutes {

  static get routes(): Router {

    const router = Router();

    const datasource = new TodoDataSourceImplementation();
    const repository = new TodoRepositoryImplementation(datasource);
    const todoController = new TodoController(repository);

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.post('/', todoController.createTodo);
    router.patch('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;

  }

}

export default TodoRoutes;
