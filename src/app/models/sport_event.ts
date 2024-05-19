export class SportEvent {
  constructor(
    public id: string,
    public event_name: string,
    public event_description: string,
    public event_location: string,
    public event_type: string,
    public event_date: string,
    public sport: string,
    public link: string,
    public src: string | null | undefined,
  ) { }
}
