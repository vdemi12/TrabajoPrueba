import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Season } from "../../models/season.model";
import { StrapiMedia } from "../../services/impl/strapi-media.service";
import { NumericValueAccessor } from "@ionic/angular";


export interface MediaRaw{
    data: StrapiMedia
}
export interface UserRaw{
    data: any
}
export interface SerieRaw{
    data: any
}

export interface SeasonRaw {
    data: Data
    meta: Meta
  }
  
export interface Data {
    id: number
    attributes: SeasonAttributes
}
export interface SeasonData {
    data: SeasonAttributes;
}

export interface SeasonAttributes {
    name: string
    numSeason: string
    numEpisodes: number
    releaseDate: Date
    rating: number
    serie:SerieRaw | number | null,
    user:UserRaw | number | null,
    picture:MediaRaw | number | null
}

export interface SerieAttributes {
    name: string
}

export interface Meta {}

@Injectable({
    providedIn: 'root'
  })
  export class SeasonsMappingStrapi implements IBaseMapping<Season> {

    setAdd(data: Season):SeasonData {
        return {
            data:{
                name:data.name,
                numSeason:data.numSeason,
                numEpisodes:data.numEpisodes,
                releaseDate:data.releaseDate,
                rating:data.rating,
                serie:data.serieId?Number(data.serieId):null,
                user:data.userId?Number(data.userId):null,
                picture:data.picture?Number(data.picture):null
            }
        };
    }
    setUpdate(data: Partial<Season>): SeasonData {
        const mappedData: Partial<SeasonAttributes> = {};

        Object.keys(data).forEach(key => {
            switch(key){
                case 'name': mappedData.name = data[key];
                break;
                case 'numSeason': mappedData.numSeason = data[key];
                break;
                case 'numEpisodes': mappedData.numEpisodes = data[key];
                break;
                case 'releaseDate': mappedData.releaseDate = data[key];
                break;
                case 'rating': mappedData.rating = data[key];
                break;
                case 'serieId': mappedData.serie = data[key] ? Number(data[key]) : null;
                break;
                case 'userId': mappedData.user = data[key] ? Number(data[key]) : null;
                break;
                case 'picture': mappedData.picture = data[key] ? Number(data[key]) : null;
                break;
            }
        });

        return {
            data: mappedData as SeasonAttributes
        };
    }

    getPaginated(page:number, pageSize: number, pages:number, data:Data[]): Paginated<Season> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Season>((d:Data|SeasonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: Data | SeasonRaw): Season {
        const isSeasonRaw = (data: Data | SeasonRaw): data is SeasonRaw => 'meta' in data;

        const attributes = isSeasonRaw(data) ? data.data.attributes : data.attributes;
        const id = isSeasonRaw(data) ? data.data.id : data.id;
        
        return {
            id: id.toString(),
            name: attributes.name,
            numSeason: attributes.numSeason,
            numEpisodes: attributes.numEpisodes,
            releaseDate: attributes.releaseDate,
            rating: attributes.rating,
            serieId: typeof attributes.serie === 'object' ? attributes.serie?.data?.id.toString() : undefined,
            userId: typeof attributes.user === 'object' ? attributes.user?.data?.id.toString() : undefined,
            picture: typeof attributes.picture === 'object' ? {
                url: attributes.picture?.data?.attributes?.url,
                large: attributes.picture?.data?.attributes?.formats?.large?.url || attributes.picture?.data?.attributes?.url,
                medium: attributes.picture?.data?.attributes?.formats?.medium?.url || attributes.picture?.data?.attributes?.url,
                small: attributes.picture?.data?.attributes?.formats?.small?.url || attributes.picture?.data?.attributes?.url,
                thumbnail: attributes.picture?.data?.attributes?.formats?.thumbnail?.url || attributes.picture?.data?.attributes?.url,
            } : undefined
        };
    }
    getAdded(data: SeasonRaw):Season {
        return this.getOne(data.data);
    }
    getUpdated(data: SeasonRaw):Season {
        return this.getOne(data.data);
    }
    getDeleted(data: SeasonRaw):Season {
        return this.getOne(data.data);
    }
  }
  