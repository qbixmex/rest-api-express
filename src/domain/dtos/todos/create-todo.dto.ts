class CreateTodoDTO {
  constructor(
    public readonly title: string,
  ) {}

  static create(props: {[key: string]: any}): [string?, CreateTodoDTO?] {
    const { title } = props;

    if (!title) {
      return [
        'title property is required !',
        undefined
      ];
    }

    return [
      undefined,
      new CreateTodoDTO(title),
    ];
  }
}

export default CreateTodoDTO;