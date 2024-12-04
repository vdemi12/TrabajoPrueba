// src/app/services/impl/seasons.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { ISeasonsService } from '../../services/interfaces/seasons-service.interface';
import { Season } from '../../models/season.model';
import { SERIES_REPOSITORY_TOKEN, SEASONS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { ISeasonsRepository } from '../../repositories/intefaces/seasons-repository.interface';
import { ISeriesService } from '../../services/interfaces/series-service.interface';
import { Serie } from '../../models/serie.model';
import { ISeriesRepository } from '../../repositories/intefaces/series-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends BaseService<Serie> implements ISeriesService {
  constructor(
    @Inject(SERIES_REPOSITORY_TOKEN) repository: ISeriesRepository
  ) {
    super(repository);
  }

  // Implementa métodos específicos si los hay
}
