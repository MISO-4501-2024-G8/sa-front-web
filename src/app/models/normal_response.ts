export class NormalResponse {
  constructor(
    public message: string,
    public code: number,
    public error: string,
  ) { }
}
