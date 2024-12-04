import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Season } from "../models/season.model";
import { Paginated } from "../models/paginated.model";

export interface PaginatedRaw<T> {
    first: number
    prev: number|null
    next: number|null
    last: number
    pages: number
    items: number
    data: T[]
  };

  export interface SeasonRaw {
    id: string
    name: string
    numSeason: string
    numEpisodes: number
    releaseDate: Date
    rating: number
}
@Injectable({
    providedIn:'root'
})
export class MySeasonsService{

    private apiUrl:string = "http://localhost:3000/seasons"
    constructor(
        private http:HttpClient
    ){

    }

    getAll(page:number, pageSize:number): Observable<Paginated<Season>> {
        return this.http.get<PaginatedRaw<SeasonRaw>>(`${this.apiUrl}/?_page=${page}&_per_page=${pageSize}`).pipe(map(res=>{
            return {page:page, pageSize:pageSize, pages:res.pages, data:res.data.map<Season>((d:SeasonRaw)=>{
                return {
                    id:d.id, 
                    name:d.name, 
                    numSeason:d.numSeason, 
                    numEpisodes:d.numEpisodes, 
                    releaseDate:d.releaseDate, 
                    rating:d.rating, 
                    };
            })};
        }))
    }
}