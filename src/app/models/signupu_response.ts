export class SignupUserResponse {
  constructor(
    public message: string,
    public token: string,
    public id: string,
    public expirationToken: string,
    public code: number,
    public error: string
  ) { }
}
