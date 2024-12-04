// src/app/core/repositories/interfaces/serie-repository.interface.ts
import { Serie } from "../../models/serie.model";
import { Season } from "../../models/season.model";
import { IBaseRepository } from "./base-repository.interface";

export interface ISeriesRepository extends IBaseRepository<Serie>{

}