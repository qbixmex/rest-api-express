import { validate as uuidValidate } from 'uuid';
// type UpdateTodoDTOProps = {
//   title?: string;
//   completedAt?: Date;
// };


class UpdateTodoDTO {
  constructor(
    public readonly id: string,
    public readonly title?: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const outputObject: { [ key: string ]: any } = {};
    if (this.title) {
      outputObject.title = this.title;
      outputObject.completedAt = this.completedAt;
      outputObject.updatedAt = new Date();
    }
    return outputObject;
  }

  static create(props: { [ key: string ]: any }): [string?, UpdateTodoDTO?] {
    const { id, title, completedAt } = props;
    let completedAtDate = completedAt;

    if (!uuidValidate(id)) {
      return [
        `id: ${id}, must be a valid uuid !`,
        undefined
      ];
    }

    if (title && typeof title !== 'string') {
      return [
        'title property must be a valid string !',
        undefined
      ];
    }

    if (completedAtDate) {
      completedAtDate = new Date(completedAtDate);
      if (completedAtDate.toString() === 'Invalid Date') {
        return [
          'completedAt property must be a valid date !',
          undefined
        ];
      }
    }

    return [
      undefined,
      new UpdateTodoDTO(id, title, completedAtDate),
    ];
  }
}

export default UpdateTodoDTO;
