export class ProblemDetails {
  private _title: string;
  private _detail: string;
  constructor(problemDetail: ProblemDetail) {
    this._title = problemDetail.title;
    this._detail = problemDetail.detail;
  }

  get title() {
    return this._title;
  }

  get detail() {
    return this._detail;
  }
}

interface ProblemDetail {
  title: string;
  detail: string;
}
