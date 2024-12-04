import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Season } from "../models/season.model";
import { Paginated } from "../models/paginated.model";
import { Serie } from "../models/serie.model";

export interface PaginatedRaw<T> {
    first: number
    prev: number|null
    next: number|null
    last: number
    pages: number
    items: number
    data: T[]
  };

  export interface SerieRaw {
    id: string
    name: string
    synopsis: string
    releaseYear: number
    rating: number
}
@Injectable({
    providedIn:'root'
})
export class MySeriesService{

    private apiUrl:string = "http://localhost:3000/series"
    constructor(
        private http:HttpClient
    ){

    }

    getAll(page:number, pageSize:number): Observable<Paginated<Serie>> {
        return this.http.get<PaginatedRaw<SerieRaw>>(`${this.apiUrl}/?_page=${page}&_per_page=${pageSize}`).pipe(map(res=>{
            return {page:page, pageSize:pageSize, pages:res.pages, data:res.data.map<Serie>((d:SerieRaw)=>{
                return {
                    id:d.id, 
                    name:d.name, 
                    synopsis:d.synopsis, 
                    releaseYear:d.releaseYear, 
                    rating:d.rating, 
                };
            })};
        }))
    }
}