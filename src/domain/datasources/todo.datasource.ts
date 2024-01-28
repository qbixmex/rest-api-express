import { CreateTodoDTO, UpdateTodoDTO } from '../dtos/todos';
import { TodoEntity } from '../entities';

abstract class TodoDataSource {

  abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;

  // TODO: Implement Pagination, Filtering, Sorting
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: string): Promise<TodoEntity>;
  abstract updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
  abstract deleteById(id: string): Promise<TodoEntity>;
}

export default TodoDataSource;
