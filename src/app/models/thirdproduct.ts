import { Availability } from "./availability";

export class ThirdProduct{
  constructor(
    public id: string,
    public id_third_user: string,
    public name: string,
    public description: string,
    public value: number,
    public typeProduct: string,
    public representative_phone: string,
    public address: string | null,
    public availability: Availability[] | null,
  ){}
}
