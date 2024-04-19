export class PlanUpdateResponse {
  constructor(
    public message: string,
    public plan: string,
    public code: number,
    public error: string
  ) { }
}
