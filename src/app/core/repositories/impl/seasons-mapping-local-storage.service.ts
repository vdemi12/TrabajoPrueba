import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Season } from "../../models/season.model";
import { NumericValueAccessor } from "@ionic/angular";

interface SeasonRaw{
    id:string,
    name:string,
    numSeason:string,
    numEpisodes:number,
    releaseDate:Date,
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
  export class SeasonsLocalStorageMapping implements IBaseMapping<Season> {
    setAdd(data: Season) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize:number, pages:number, data: SeasonRaw[]): Paginated<Season> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Season>((d:SeasonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: SeasonRaw):Season {
        return {
            id:data.id, 
            name:data.name, 
            numSeason:data.numSeason, 
            numEpisodes:data.numEpisodes,
            releaseDate:data.releaseDate,
            rating:data.rating,
            picture:{
                url:data.picture.url,
                large:data.picture.large, 
                medium:data.picture.medium,
                small:data.picture.small,
                thumbnail:data.picture.thumbnail
            }};
    }
    getAdded(data: SeasonRaw):Season {
        return this.getOne(data);
    }
    getUpdated(data: SeasonRaw):Season {
        return this.getOne(data);
    }
    getDeleted(data: SeasonRaw):Season {
        return this.getOne(data);
    }
  }
  