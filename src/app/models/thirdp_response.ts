import { ThirdProduct } from './thirdproduct';
export class ThirdProductResponse {
  constructor(
    public message: string,
    public code: number,
    public error: string,
    public productType: string,
    public thirdProduct: ThirdProduct,
    public trainer: {},
    public doctor: {},
    public availability: [],
  ) { }
}
