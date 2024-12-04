// src/app/services/interfaces/seasons.service.interface.ts
import { Serie } from '../../models/serie.model';
import { Season } from '../../models/season.model';
import { IBaseService } from './base-service.interface';

export interface ISeriesService extends IBaseService<Serie> {
  // Métodos específicos si los hay
}
