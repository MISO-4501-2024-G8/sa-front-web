export class SignupUser {
  constructor(
    public email: string,
    public password: string,
    public doc_num: string,
    public doc_type: string,
    public name: string,
    public surname: string,
    public phone: string,
    public user_type: string,
    public gender: string,
    public age: number,
    public weight: number,
    public height: number,
    public birth_country: string,
    public birth_city: string,
    public residence_country: string,
    public residence_city: string,
    public residence_seniority: number,
    public sports: string,
    public typePlan: string,
    public acceptance_notify: boolean,
    public acceptance_tyc: boolean,
    public acceptance_personal_data: boolean
  ) { }
}
