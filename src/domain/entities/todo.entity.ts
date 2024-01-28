class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly completedAt?: Date | null,
  ) {}

  get isCompleted(): boolean {
    return !!this.completedAt;
  }
}

export default TodoEntity;
