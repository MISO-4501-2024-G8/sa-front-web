export class CustomerServiceResponse{
  constructor(
    public id: string,
    public id_user: string,
    public id_service: string,
    public user_name: string,
    public user_address: string,
    public user_neighborhood: string,
    public user_phone: string,
    public value: number,
    public service_date: string,
    public code: number,
    public message: string,
    public error: string,
  ){}
}
