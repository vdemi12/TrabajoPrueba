// src/app/repositories/repository.factory.ts
import { FactoryProvider, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepositoryHttpService } from './impl/base-repository-http.service';
import { IBaseRepository } from './intefaces/base-repository.interface';
import { Season } from '../models/season.model';
import { Person } from '../models/person.model';
import { AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, SERIES_API_URL_TOKEN, SERIES_REPOSITORY_MAPPING_TOKEN, SERIES_REPOSITORY_TOKEN, SERIES_RESOURCE_NAME_TOKEN, SEASONS_API_URL_TOKEN, SEASONS_REPOSITORY_MAPPING_TOKEN, SEASONS_REPOSITORY_TOKEN, SEASONS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_REPOSITORY_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN } from './repository.tokens';
import { BaseRespositoryLocalStorageService } from './impl/base-repository-local-storage.service';
import { Model } from '../models/base.model';
import { IBaseMapping } from './intefaces/base-mapping.interface';
import { JsonServerRepositoryService } from './impl/json-server-repository.service';
import { Serie } from '../models/serie.model';
import { StrapiRepositoryService } from './impl/strapi-repository.service';
import { BaseAuthenticationService } from '../services/impl/base-authentication.service';
import { IAuthMapping } from '../services/interfaces/auth-mapping.interface';
import { StrapiAuthenticationService } from '../services/impl/strapi-authentication.service';
import { SeasonsLocalStorageMapping } from './impl/seasons-mapping-local-storage.service';
import { SeriesLocalStorageMapping } from './impl/series-mapping-local-storage.service';
import { SeasonsMappingJsonServer } from './impl/seasons-mapping-json-server.service';
import { SeasonsMappingStrapi } from './impl/seasons-mapping-strapi.service';
import { PeopleLocalStorageMapping } from './impl/people-mapping-local-storage.service';
import { PeopleMappingJsonServer } from './impl/people-mapping-json-server.service';
import { PeopleMappingStrapi } from './impl/people-mapping-strapi.service';
import { StrapiAuthMappingService } from '../services/impl/strapi-auth-mapping.service';
import { SeriesMappingJsonServer } from './impl/series-mapping-json-server.service';
import { SeriesMappingStrapi } from './impl/series-mapping-strapi.service';
import { IStrapiAuthentication } from '../services/interfaces/strapi-authentication.interface';
import { StrapiMediaService } from '../services/impl/strapi-media.service';
import { BaseMediaService } from '../services/impl/base-media.service';

export function createBaseRepositoryFactory<T extends Model>(
  token: InjectionToken<IBaseRepository<T>>,
  dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string, http: HttpClient, auth:IStrapiAuthentication, apiURL: string, resource: string, mapping: IBaseMapping<T>) => {
      switch (backend) {
        case 'http':
          return new BaseRepositoryHttpService<T>(http, auth, apiURL, resource, mapping);
        case 'local-storage':
          return new BaseRespositoryLocalStorageService<T>(resource, mapping);
        case 'json-server':
          return new JsonServerRepositoryService<T>(http, auth,apiURL, resource, mapping);
        case 'strapi':
          return new StrapiRepositoryService<T>(http, auth, apiURL, resource, mapping);
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export function createBaseMappingFactory<T extends Model>(
  token: InjectionToken<IBaseMapping<T>>,
  dependencies: any[],
  modelType: 'season' | 'serie' | 'person'
): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'local-storage':
          return modelType === 'season' 
            ? new SeasonsLocalStorageMapping()
            : new SeriesLocalStorageMapping();
        case 'json-server':
          return modelType === 'season'
            ? new SeasonsMappingJsonServer()
            : new SeriesMappingJsonServer();
        case 'strapi':
          return modelType === 'season'
            ? new SeasonsMappingStrapi()
            : new SeriesMappingStrapi();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};

export function createBaseAuthMappingFactory(token: InjectionToken<IAuthMapping>, dependencies:any[]): FactoryProvider {
  return {
    provide: token,
    useFactory: (backend: string) => {
      switch (backend) {
        case 'http':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'local-storage':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'json-server':
          throw new Error("BACKEND NOT IMPLEMENTED");
        case 'strapi':
          return new StrapiAuthMappingService();
        default:
          throw new Error("BACKEND NOT IMPLEMENTED");
      }
    },
    deps: dependencies
  };
};


export const SeasonsMappingFactory = createBaseMappingFactory<Season>(
  SEASONS_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'season'
);

export const SeriesMappingFactory = createBaseMappingFactory<Serie>(
  SERIES_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'serie'
);

export const PeopleMappingFactory = createBaseMappingFactory<Person>(
  PEOPLE_REPOSITORY_MAPPING_TOKEN, 
  [BACKEND_TOKEN],
  'person'
);

export const AuthMappingFactory: FactoryProvider = createBaseAuthMappingFactory(AUTH_MAPPING_TOKEN, [BACKEND_TOKEN]);

export const AuthenticationServiceFactory:FactoryProvider = {
  provide: BaseAuthenticationService,
  useFactory: (backend:string, signIn:string, signUp:string, meUrl:string, mapping:IAuthMapping, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiAuthenticationService(signIn, signUp, meUrl, mapping, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_MAPPING_TOKEN, HttpClient]
};

export const MediaServiceFactory:FactoryProvider = {
  provide: BaseMediaService,
  useFactory: (backend:string, upload:string, auth:IStrapiAuthentication, http:HttpClient) => {
    switch(backend){
      case 'http':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'local-storage':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'json-server':
        throw new Error("BACKEND NOT IMPLEMENTED");
      case 'strapi':
        return new StrapiMediaService(upload, auth, http);
      default:
        throw new Error("BACKEND NOT IMPLEMENTED");
    }
    
  },
  deps: [BACKEND_TOKEN, UPLOAD_API_URL_TOKEN, BaseAuthenticationService, HttpClient]
};

export const SeasonsRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Season>(SEASONS_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, SEASONS_API_URL_TOKEN, SEASONS_RESOURCE_NAME_TOKEN, SEASONS_REPOSITORY_MAPPING_TOKEN]
);
export const SeriesRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Serie>(SERIES_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, SERIES_API_URL_TOKEN, SERIES_RESOURCE_NAME_TOKEN, SERIES_REPOSITORY_MAPPING_TOKEN]
);
export const PeopleRepositoryFactory: FactoryProvider = createBaseRepositoryFactory<Person>(PEOPLE_REPOSITORY_TOKEN,
  [BACKEND_TOKEN, HttpClient, BaseAuthenticationService, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN]
);
