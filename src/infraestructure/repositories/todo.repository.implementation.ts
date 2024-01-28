import {
  CreateTodoDTO, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDTO
} from '../../domain';

class TodoRepositoryImplementation implements TodoRepository {

  constructor(
    private readonly dataSource: TodoDataSource
  ) {}

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDTO);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }

  findById(id: string): Promise<TodoEntity> {
    return this.dataSource.findById(id);
  }

  updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.dataSource.updateById(updateTodoDTO);
  }

  deleteById(id: string): Promise<TodoEntity> {
    return this.dataSource.deleteById(id);
  }

}

export default TodoRepositoryImplementation;
