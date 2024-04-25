export class SEvent{
  constructor(
    public id: string,
    public event_name: string,
    public event_description: string,
    public event_location: string,
    public event_type: string,
    public sport: string,
    public link: string,
    public imageUrl: string | null,
  ){}
}
