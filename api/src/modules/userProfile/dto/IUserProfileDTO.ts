export interface IUserProfileDTO{
    user_id:string
    image?:string
    description:string
    stance:"goofy" | "regular"
    favorite_brands:string
    favorite_spots:string
}
