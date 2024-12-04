import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Serie } from 'src/app/core/models/serie.model';
import { Season } from 'src/app/core/models/season.model';

@Component({
  selector: 'app-season-modal',
  templateUrl: './season-modal.component.html',
  styleUrls: ['./season-modal.component.scss'],
})
export class SeasonModalComponent  implements OnInit {
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;
  private _series:BehaviorSubject<Serie[]> = new BehaviorSubject<Serie[]>([]);
  public series$:Observable<Serie[]> = this._series.asObservable();

  @Input() set series(series:Serie[]){
    this._series.next(series);
  }

  @Input() set season(_season:Season){
    if(_season && _season.id)
      this.mode = 'edit';
    
    this.formGroup.controls['name'].setValue(_season.name);
    this.formGroup.controls['numSeason'].setValue(_season.numSeason);
    this.formGroup.controls['numEpisodes'].setValue(_season.numEpisodes);
    this.formGroup.controls['releaseDate'].setValue(_season.releaseDate);
    this.formGroup.controls['rating'].setValue(_season.rating);
    this.formGroup.controls['serieId'].setValue(_season.serieId);
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform,
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      numSeason:['', [Validators.required]],
      numEpisodes:['', [Validators.required]],
      releaseDate:['', [Validators.required]],
      rating:['', [Validators.required]],
      serieId:[null, [Validators.required]]
    });
  }
  

  ngOnInit() {} 

  get name(){
    return this.formGroup.controls['name'];
  }

  get numSeason(){
    return this.formGroup.controls['numSeason'];
  }

  get numEpisodes(){
    return this.formGroup.controls['numEpisodes'];
  }

  get releaseDate(){
    return this.formGroup.controls['releaseDate'];
  }

  get rating(){
    return this.formGroup.controls['rating'];
  }
  
  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }

  onSubmit(){
    if (this.formGroup.valid) {
      this.modalCtrl.dismiss(
          (this.mode=='new'?
            this.formGroup.value:
            this.getDirtyValues(this.formGroup)), this.mode
      );
    } else {
      console.log('Formulario inválido');
    }

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
