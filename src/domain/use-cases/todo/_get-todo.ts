import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface GetTodoInterface {
  execute(id: string): Promise<TodoEntity>;
}

export class GetTodoUseCase implements GetTodoInterface {

  constructor(
    private readonly repository: TodoRepository,
  ) {}

  execute(id: string): Promise<TodoEntity> {
    return  this.repository.findById(id);
  }

}