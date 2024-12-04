// src/app/services/impl/seasons.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { ISeasonsService } from '../../services/interfaces/seasons-service.interface';
import { Season } from '../../models/season.model';
import { SEASONS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ISeasonsRepository } from '../../repositories/intefaces/seasons-repository.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService extends BaseService<Season> implements ISeasonsService {
  constructor(
    @Inject(SEASONS_REPOSITORY_TOKEN) repository: ISeasonsRepository
  ) {
    super(repository);
  }
  
  // Implementa métodos específicos si los hay
  getByUserId(userId: string): Observable<Season | null> {
    return this.repository.getAll(1, 1, {user: userId}).pipe(
      map(res => Array.isArray(res) ? res[0] || null : res.data[0] || null)
    );
  }

  
}
