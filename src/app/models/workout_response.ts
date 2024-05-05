import { Athlete } from "./athlete";
import { StravaActivity } from "./strava_activity";
import { StravaUser } from "./strava_user";

export class WorkoutResponse {
  constructor(
    public message: string,
    public code: number,
    public athlete: Athlete | null,
    public strava_user: StravaUser | null,
    public activities: StravaActivity[] | null,
    public error: string
  ){}
}
