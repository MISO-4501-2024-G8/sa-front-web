import { ThirdProductResponse } from "./thirdp_response";

export class ThirdProductAllResponse {
  constructor(
    public message: string,
    public code: number,
    public error: string,
    public allProducts: ThirdProductResponse[],
  ) { }
}
