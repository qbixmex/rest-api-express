import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface GetTodosInterface {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodosUseCase implements GetTodosInterface {

  constructor(
    private readonly repository: TodoRepository,
  ) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }

}