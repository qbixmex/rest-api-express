import { CreateTodoDTO, TodoDataSource, TodoEntity, UpdateTodoDTO } from "../../domain";
import prisma from '../../presentation/todos/data/postgres';

class TodoDataSourceImplementation implements TodoDataSource {

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo));
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

export default TodoDataSourceImplementation;
