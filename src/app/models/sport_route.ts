export class SportRoute {
  constructor(
    public id: string,
    public route_name: string,
    public route_description: string,
    public route_location_A: string,
    public route_location_B: string,
    public route_latlon_A: string,
    public route_latlon_B: string,
    public route_type: string,
    public route_date: string,
    public sport: string,
    public link: string,
  ) { }
}
