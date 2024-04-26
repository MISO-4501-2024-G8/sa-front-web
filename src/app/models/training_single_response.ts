import { SportEvent } from "./sport_event";
import { SportRoute } from "./sport_route";
import { TrainingSession } from "./training_session";

export class TrainingSingleResponse {
  constructor(
    public message: string,
    public code: number,
    public content: TrainingSession[] | SportEvent | SportRoute | null,
    public error: string,
  ) { }
}
