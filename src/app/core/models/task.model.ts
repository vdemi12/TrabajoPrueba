import { Model } from "./base.model";
import { Season } from "./season.model";

export interface Task extends Model{
    owner:Season,
    date:Date
}