import { UpdateTodoDTO } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface UpdateTodoInterface {
  execute(dto: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodoUseCase implements UpdateTodoInterface {

  constructor(
    private readonly repository: TodoRepository,
  ) {}

  execute(dto: UpdateTodoDTO): Promise<TodoEntity> {
    return  this.repository.updateById(dto);
  }

}