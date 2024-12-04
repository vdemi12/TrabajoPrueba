// src/app/repositories/impl/base-repository-http.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBaseRepository, SearchParams } from '../intefaces/base-repository.interface';
import { API_URL_TOKEN, AUTH_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { Model } from '../../models/base.model';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Paginated } from '../../models/paginated.model';
import { BaseAuthenticationService } from '../../services/impl/base-authentication.service';
import { IStrapiAuthentication } from '../../services/interfaces/strapi-authentication.interface';
import { IAuthentication } from '../../services/interfaces/authentication.interface';


@Injectable({
  providedIn: 'root'
})
export class BaseRepositoryHttpService<T extends Model> implements IBaseRepository<T> {

  constructor(
    protected http: HttpClient,
    @Inject(AUTH_TOKEN) protected auth: IAuthentication,
    @Inject(API_URL_TOKEN) protected apiUrl: string, // URL base de la API para el modelo
    @Inject(RESOURCE_NAME_TOKEN) protected resource:string, //nombre del recurso del repositorio
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping:IBaseMapping<T>
  ) {
    this.apiUrl = apiUrl;
  }


  getAll(page:number, pageSize:number, filters:SearchParams): Observable<T[] | Paginated<T>> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.resource}`).pipe(map(res=>this.mapping.getPaginated(page, pageSize, 0, res)));
  }

  getById(id: string): Observable<T | null> {
    return this.http.get<T>(`${this.apiUrl}/${this.resource}/${id}`).pipe(map(res=>this.mapping.getOne(res)));
  }

  add(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.resource}`, entity).pipe(map(res=>this.mapping.getAdded(res)));
  }

  update(id: string, entity: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.resource}/${id}`, entity).pipe(map(res=>this.mapping.getUpdated(res)));
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.resource}/${id}`).pipe(map(res=>this.mapping.getDeleted(res)));
  }
}
