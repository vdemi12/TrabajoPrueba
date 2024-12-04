import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Season } from "../../models/season.model";


export interface SeasonRaw {
    id?: string
    name: string
    numSeason: string
    numEpisodes: number
    releaseDate: Date
    rating:number
}
@Injectable({
    providedIn: 'root'
  })
  export class SeasonsMappingJsonServer implements IBaseMapping<Season> {

    setAdd(data: Season):SeasonRaw {
        return {
            name:data.name,
            numSeason:data.numSeason,
            numEpisodes:data.numEpisodes,
            releaseDate:data.releaseDate,
            rating:data.rating,
        };
    }
    setUpdate(data: Season):SeasonRaw {
        let toReturn:any = {};  
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': toReturn['name']=data[key];
                break;
                case 'numSeason': toReturn['numSeason']=data[key];
                break;
                case 'numEpisodes': toReturn['numEpisodes']=data[key];
                break;
                case 'releaseDate': toReturn['releaseDate']=data[key];
                break;
                case 'rating': toReturn['rating']=data[key];
                break;
                default:
            }
        });
        return toReturn;
    }
    getPaginated(page:number, pageSize: number, pages:number, data:SeasonRaw[]): Paginated<Season> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Season>((d:SeasonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: SeasonRaw):Season {
        return {
            id:data.id!, 
            name:data.name, 
            numSeason:data.numSeason, 
            numEpisodes:data.numEpisodes, 
            releaseDate:data.releaseDate, 
            rating:data.rating,
            picture:(data as any)["picture"]?{
                url:(data as any)["picture"].url,
                large:(data as any)["picture"].large, 
                medium:(data as any)["picture"].medium,
                small:(data as any)["picture"].small,
                thumbnail:(data as any)["picture"].thumbnail
            }:undefined};
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
  