import {
  CreateTodoDTO, CustomError, TodoDataSource, TodoEntity, UpdateTodoDTO
} from "../../domain";
import prisma from '../../presentation/todos/data/postgres';
import { validate as isValidUUID } from 'uuid';

class TodoDataSourceImplementation implements TodoDataSource {

  async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDTO!,
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo));
  }

  async findById(id: string): Promise<TodoEntity> {

    if (!isValidUUID(id)) {
      throw new CustomError(`Invalid id: ${id} !`, 400);
    }

    const todo = await prisma.todo.findFirst({
      where: { id }
    });

    if (!todo) {
      throw new CustomError(`Todo with id: ${id}, not found !`, 404);
    }

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(updateTodoDTO.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: string): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({
      where: { id }
    });

    return TodoEntity.fromObject(deletedTodo);
  }

}

export default TodoDataSourceImplementation;
