class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, title, completedAt } = object;

    if (!id) {
      throw 'Todo id is required !';
    }

    if (!title) {
      throw 'Todo title is required !';
    }

    let newCompletedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if ( isNaN(newCompletedAt.getTime()) ) {
        throw 'Todo completedAt must be a valid date !';
      }
    }

    return new TodoEntity(id, title, completedAt);

  }
}

export default TodoEntity;
