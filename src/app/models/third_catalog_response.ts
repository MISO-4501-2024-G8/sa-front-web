import { ThirdUserCatalog } from "./thirdu_catalog";

export class ThirdUserCatalogResponse{
  constructor(
    public thirdUsers: ThirdUserCatalog[],
    public code: string,
    public message: string,
    public error: string,
  ) { }
}
