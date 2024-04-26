export class SEvent {
  constructor(
    public id: string,
    public event_name: string,
    public event_description: string,
    public event_location: string,
    public event_type: string,
    public event_date: string,
    public map_link: string | null,
    public sport: string,
    public link: string | null,
    public imageUrl: string | null,
    public type: string | null,
  ) { }
}
