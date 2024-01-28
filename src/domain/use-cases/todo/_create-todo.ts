import { CreateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface CreateTodoInterface {
  execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodoUseCase implements CreateTodoInterface {

  constructor(
    private readonly repository: TodoRepository,
  ) {}

  execute(dto: CreateTodoDTO): Promise<TodoEntity> {
    return  this.repository.create(dto);
  }

}