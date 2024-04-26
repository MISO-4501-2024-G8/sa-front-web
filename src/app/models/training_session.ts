export class TrainingSession {
  constructor(
    public id: string,
    public id_sport_user: string,
    public id_event: string,
    public event_category: string,
    public sport_type: string,
    public session_date: string,
  ) { }
}
