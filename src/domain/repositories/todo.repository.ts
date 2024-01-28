import { TodoDataSource } from '../datasources';
import { CreateTodoDTO, UpdateTodoDTO } from '../dtos/todos';
import { TodoEntity } from '../entities';

class TodoRepository implements TodoDataSource {

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<TodoEntity[]> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: string): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

}

export default TodoRepository;
