import { UserDetail } from "./userdetail";

export class UserInfo {
  constructor(
    public id: string,
    public email: string,
    public doc_num: string,
    public doc_type: string,
    public name: string,
    public phone: string,
    public user_type: number,
    public token: string,
    public detail: UserDetail,
    public code: number,
    public message: string,
    public error: string,
  ) { }
}
