import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface DeleteTodoInterface {
  execute(id: string): Promise<TodoEntity>;
}

export class DeleteTodoUseCase implements DeleteTodoInterface {

  constructor(
    private readonly repository: TodoRepository,
  ) {}

  execute(id: string): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }

}