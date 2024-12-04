import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Season } from "../../models/season.model";
import { Serie } from "../../models/serie.model";

export interface SerieRaw {
    id: string
    nombre: string
    synopsis: string
    releaseYear: number
    rating: number
}
@Injectable({
    providedIn: 'root'
  })
  export class SeriesMappingJsonServer implements IBaseMapping<Serie> {
    setAdd(data: Serie) {
        throw new Error("Method not implemented.");
    }
    setUpdate(data: any) {
        throw new Error("Method not implemented.");
    }
    getPaginated(page:number, pageSize: number, pages:number, data:SerieRaw[]): Paginated<Serie> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Serie>((d:SerieRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: SerieRaw):Serie {
        return {
            id:data.id, 
            name:data.nombre, 
            synopsis:data.synopsis, 
            releaseYear:data.releaseYear, 
            rating:data.rating, 
        };
    }
    getAdded(data: any):Serie {
        throw new Error("Method not implemented.");
    }
    getUpdated(data: any):Serie {
        throw new Error("Method not implemented.");
    }
    getDeleted(data: any):Serie {
        throw new Error("Method not implemented.");
    }
  }
  