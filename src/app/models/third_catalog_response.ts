import { ThirdUserCatalog } from "./thirdu_catalog";

export class ThirdUserCatalogResponse{
  constructor(
    public thirdUsers: ThirdUserCatalog[],
    public code: number,
    public message: string,
    public error: string,
  ) { }
}
