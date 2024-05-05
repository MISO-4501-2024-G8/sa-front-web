export class Athlete {
    constructor(
      public id: number,
      public username: string,
      public resource_state: number,
      public firstname: string,
      public lastname: string,
      public bio: string,
      public city: string,
      public state: string,
      public country: string,
      public sex: string,
      public premium: boolean,
      public summit: boolean,
      public created_at: string,
      public updated_at: string,
      public badge_type_id: number,
      public weight: number,
      public profile_medium: string,
      public profile: string,
      public friend: string,
      public follower: string
    ){}
  }
