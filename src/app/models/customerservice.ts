export class CustomerService {
  constructor(
    public id_user: string,
    public id_service: string,
    public name: string|undefined,
    public surname: string|undefined,
    public user_name: string,
    public user_address: string,
    public user_neighborhood: string,
    public user_phone: string,
    public value: number,
    public service_date: string,
  ) { }
}
