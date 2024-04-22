import { UserInfo } from "./userinfo";

export class UserInfoResponse {
  constructor(
    public user: UserInfo,
    public code: number,
    public message: string,
    public error: string,
  ) { }
}
