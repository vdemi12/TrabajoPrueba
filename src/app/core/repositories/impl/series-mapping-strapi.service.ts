import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Serie } from "../../models/serie.model";

export interface SerieRaw {
    data: Data
    meta: Meta
  }
  
export interface Data {
    id: number
    attributes: SerieAttributes
}
export interface SerieData {
    data: SerieAttributes;
}

export interface SerieAttributes {
    name: string
    synopsis: string
    releaseYear: number
    rating: number
}

export interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class SeriesMappingStrapi implements IBaseMapping<Serie> {
    

    setAdd(data: Serie):SerieData {
        return {
            data:{
                name:data.name,
                synopsis:data.synopsis,
                releaseYear:data.releaseYear,
                rating:data.rating
            }
        };
    }
    setUpdate(data: Serie):SerieData {
        let toReturn:SerieData = {
            data:{
                name:"",
                synopsis:"",
                releaseYear: data.releaseYear,
                rating: data.rating
            }
        };  
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': toReturn.data['name']=data[key];
                break;
                default:
            }
        });
        return toReturn;
    }
    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Serie> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Serie>((d:Data)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | SerieRaw): Serie {
        const isSerieRaw = (data: Data | SerieRaw): data is SerieRaw => 'meta' in data;
        
        const attributes = isSerieRaw(data) ? data.data.attributes : data.attributes;
        const id = isSerieRaw(data) ? data.data.id : data.id;

        return {
            id: id.toString(),
            name: attributes.name,
            synopsis: attributes.synopsis,
            releaseYear: attributes.releaseYear,
            rating: attributes.rating,
        };
    }
    getAdded(data: SerieRaw):Serie {
        return this.getOne(data.data);
    }
    getUpdated(data: SerieRaw):Serie {
        return this.getOne(data.data);
    }
    getDeleted(data: SerieRaw):Serie {
        return this.getOne(data.data);
    }
  }
  