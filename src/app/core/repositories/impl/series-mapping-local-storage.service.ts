import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Serie } from "../../models/serie.model";
import { NumericValueAccessor } from "@ionic/angular";

interface SerieRaw{
    id:string,
    name:string,
    synopsis:string,
    releaseYear:number,
    rating:number,
    picture:{
        url:string,
        large:string,
        medium:string,
        small:string,
        thumbnail:string
    }
}

@Injectable({
    providedIn: 'root'
  })
  export class SeriesLocalStorageMapping implements IBaseMapping<Serie> {
    setAdd(data: Serie) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: SerieRaw[]): Paginated<Serie> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Serie>((d:SerieRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: SerieRaw):Serie {
        return {
            id:data.id, 
            name:data.name, 
            synopsis:data.synopsis, 
            releaseYear:data.releaseYear, 
            rating:data.rating,
            picture:{
                url:data.picture.url,
                large:data.picture.large, 
                medium:data.picture.medium,
                small:data.picture.small,
                thumbnail:data.picture.thumbnail
            }};
    }
    getAdded(data: SerieRaw):Serie {
        return this.getOne(data);
    }
    getUpdated(data: SerieRaw):Serie {
        return this.getOne(data);
    }
    getDeleted(data: SerieRaw):Serie {
        return this.getOne(data);
    }
  }
  