// src/app/core/season.model.ts
import { Model } from "./base.model";

export interface Season extends Model{
    name:string,
    numSeason:string,
    numEpisodes:number,
    releaseDate:Date,
    rating:number,
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
    serieId?:string,
    userId?:string
}