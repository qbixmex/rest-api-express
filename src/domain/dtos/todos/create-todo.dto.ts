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

    if (title.length < 8) {
      return [
        'title must be greater than 8 characters !',
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