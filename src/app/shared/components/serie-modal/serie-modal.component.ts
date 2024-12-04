import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Serie } from 'src/app/core/models/serie.model';

@Component({
  selector: 'app-serie-modal',
  templateUrl: './serie-modal.component.html',
  styleUrls: ['./serie-modal.component.scss'],
})
export class SerieModalComponent  implements OnInit {
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;

  @Input() set serie(_serie:Serie){
    if(_serie && _serie.id)
      this.mode = 'edit';
    
    this.formGroup.controls['name'].setValue(_serie.name);
    this.formGroup.controls['synopsis'].setValue(_serie.synopsis);
    this.formGroup.controls['releaseYear'].setValue(_serie.releaseYear);
    this.formGroup.controls['rating'].setValue(_serie.rating);
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform,
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      synopsis:['', [Validators.required]],
      releaseYear:['', [Validators.required]],
      rating:['', [Validators.required]],
      
    });
  }
  

  ngOnInit() {} 

  get name(){
    return this.formGroup.controls['name'];
  }

  get synopsis(){
    return this.formGroup.controls['synopsis'];
  }

  get releaseYear(){
    return this.formGroup.controls['releaseYear'];
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
