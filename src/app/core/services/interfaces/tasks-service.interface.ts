// src/app/services/interfaces/seasons.service.interface.ts
import { Task } from '../../models/task.model';
import { IBaseService } from './base-service.interface';

export interface ITasksService extends IBaseService<Task> {
  // Métodos específicos si los hay
}
