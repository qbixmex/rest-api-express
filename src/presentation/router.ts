import { Router } from "express";
import TodoRoutes from "./todos/todo.routes";

class AppRouter {

  static get routes(): Router {

    const router = Router();

    router.use('/api/v1/todos', TodoRoutes.routes);

    return router;

  }

}

export default AppRouter;
