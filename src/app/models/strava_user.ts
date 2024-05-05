export class StravaUser {
  constructor(
    public id: number,
    public user_id: string,
    public athlete_id: string,
    public code: string,
    public scope: string,
    public access_token: string,
    public refresh_token: string,
    public timestamp: number,
    public last_sync: string,
    public expiration_token: string,
    public createdAt: string,
    public updatedAt: string
  ){}
}
