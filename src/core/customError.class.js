export class AppError extends Error {
    constructor(...params) {
      super(...params);
      this.name = constructor.name
    }
  }

  export class RouterError extends AppError {
    constructor(...params) {
      super(...params);
    }
  }
