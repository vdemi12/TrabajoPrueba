// src/app/core/serie.model.ts
import { Model } from "./base.model";

export interface Serie extends Model{
    name:string,
    synopsis:string,
    releaseYear:number,
    rating:number,
    picture?:{
        url:string | undefined,
        large:string | undefined,
        medium:string | undefined,
        small:string | undefined,
        thumbnail:string | undefined
    },
}