import { Availability } from './availability';
import { ThirdProduct } from './thirdproduct';
export class ThirdProductResponse {
  constructor(
    public message: string,
    public code: number,
    public error: string,
    public productType: string,
    public thirdProduct: ThirdProduct,
    public trainer: {} | null,
    public doctor: {} | null,
    public availability: Availability[] | null,
  ) { }
}
