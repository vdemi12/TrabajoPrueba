import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonInput, IonPopover } from '@ionic/angular';
import { BehaviorSubject, Subscription, last, lastValueFrom } from 'rxjs';
import { Serie } from 'src/app/core/models/serie.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { SeriesService } from 'src/app/core/services/impl/series.service';


@Component({
  selector: 'app-serie-selectable',
  templateUrl: './serie-selectable.component.html',
  styleUrls: ['./serie-selectable.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SerieSelectableComponent),
    multi: true
  }]
})
export class SerieSelectableComponent  implements OnInit, ControlValueAccessor, OnDestroy {

  serieSelected:Serie | null = null;
  disabled:boolean = true;
  private _series:BehaviorSubject<Serie[]> = new BehaviorSubject<Serie[]>([]);
  public series$ = this._series.asObservable();

  propagateChange = (obj: any) => {}

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;

  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  constructor(
    public seriesSvc:SeriesService
  ) { 
  }
  ngOnDestroy(): void {
    this.popover?.dismiss();
  }
  
  onLoadSeries(){
    this.loadSeries("");
  }

  

  private async loadSeries(filter:string){
    this.page = 1;
    this.seriesSvc.getAll(this.page, this.pageSize).subscribe({
      next:response=>{
        this._series.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      },
      error:err=>{}
    }) 
  }


  loadMoreSeries(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.seriesSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Serie>)=>{
          this._series.next([...this._series.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
  }
  
  onMoreSeries(ev:InfiniteScrollCustomEvent){
    this.loadMoreSeries(ev.target);
  }

  private async selectSerie(id:string|undefined, propagate:boolean=false){
    if(id){
      this.serieSelected  = await lastValueFrom(this.seriesSvc.getById(id));
    }
    else
      this.serieSelected = null;
    if(propagate && this.serieSelected)
      this.propagateChange(this.serieSelected.id);
  }
  
  writeValue(obj: any): void {
    this.selectSerie(obj);
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  private async filter(filtering:string){
    this.loadSeries(filtering);
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onSerieClicked(popover:IonPopover, serie:Serie){
    this.selectSerie(serie.id, true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover:IonPopover|null=null){
    this.selectSerie(undefined, true);
    if(popover)
      popover.dismiss();
  }
}
