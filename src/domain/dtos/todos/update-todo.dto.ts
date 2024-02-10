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
    }
    if (this.completedAt) {
      outputObject.completedAt = this.completedAt;
    }
    outputObject.updatedAt = new Date();
    return outputObject;
  }

  static update(props: { [ key: string ]: any }): [string?, UpdateTodoDTO?] {
    const { id, title, completedAt } = props;
    let completedAtDate = completedAt;

    if (!uuidValidate(id)) {
      return [
        `Todo id: ${id}, is not valid uuid !`,
        undefined
      ];
    }

    if (!title && !completedAt) {
      return [
        'title and completedAt are mandatory !',
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
      if (new Date(completedAtDate).toString() === 'Invalid Date') {
        return [
          `completedAt property must be a valid date, "${completedAtDate}" !`,
          undefined
        ];
      }
    }

    return [
      undefined,
      new UpdateTodoDTO(id, title, completedAt),
    ];
  }

}

export default UpdateTodoDTO;
