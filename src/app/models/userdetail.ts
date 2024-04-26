export class UserDetail {
  constructor(
    public company_creation_date: string | null,
    public company_address: string | null,
    public contact_name: string | null,
    public company_description: string | null,
    public company_status: string | null,
    public gender: string | null,
    public age: number | null,
    public weight: number | null,
    public height: number | null,
    public birth_country: string | null,
    public birth_city: string | null,
    public residence_country: string | null,
    public residence_city: string | null,
    public residence_seniority: number,
    public sports: string | null,
  ) { }
}
