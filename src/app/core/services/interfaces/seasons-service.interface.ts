// src/app/services/interfaces/seasons.service.interface.ts
import { Observable } from 'rxjs';
import { Season } from '../../models/season.model';
import { IBaseService } from './base-service.interface';

export interface ISeasonsService extends IBaseService<Season> {
  // Métodos específicos si los hay
  getByUserId(userId: string): Observable<Season | null>;
}
