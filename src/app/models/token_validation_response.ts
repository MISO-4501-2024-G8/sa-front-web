export class TokenValidationResponse {
  constructor(
    public message: string,
    public code: number,
    public exp: number,
    public expirationDate: string,
    public userType: number,
    public typePlan?: string,
  ) { }
}
