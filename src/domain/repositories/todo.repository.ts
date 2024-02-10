import { CreateTodoDTO, UpdateTodoDTO } from '../dtos/todos';
import { TodoEntity } from '../entities';

abstract class TodoRepository {

  abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;

  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: string): Promise<TodoEntity>;

  abstract updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;

  abstract deleteById(id: string): Promise<TodoEntity>;

}

export default TodoRepository;
