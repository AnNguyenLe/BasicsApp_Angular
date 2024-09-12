export class ValidationProblemDetails {
  private _title: string;
  private _detail: string;
  private _errors: { [key: string]: string[] };

  constructor(validationProblemDetail: ValidationProblemDetail) {
    this._title = validationProblemDetail.title;
    this._detail = validationProblemDetail.detail;
    this._errors = validationProblemDetail.errors;
  }

  get title() {
    return this._title;
  }

  get detail() {
    return this._detail;
  }

  get errors() {
    return this._errors;
  }
}

interface ValidationProblemDetail {
  title: string;
  detail: string;
  errors: { [key: string]: string[] };
}
