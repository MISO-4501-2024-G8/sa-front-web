import { SportEvent } from "./sport_event";
import { SportRoute } from "./sport_route";
import { TrainingSession } from "./training_session";

export class SportSession{
  constructor(
    public training_session: TrainingSession,
    public event: SportEvent | null,
    public route: SportRoute | null,
  ){}
}
