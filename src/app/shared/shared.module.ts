import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieSelectableComponent } from './components/serie-selectable/serie-selectable.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { SeasonModalComponent } from './components/season-modal/season-modal.component';
import { SerieModalComponent } from './components/serie-modal/serie-modal.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SeasonModalComponent, 
    SerieModalComponent, 
    SerieSelectableComponent, 
    PictureSelectableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    SeasonModalComponent, 
    SerieModalComponent,
    SerieSelectableComponent, 
    PictureSelectableComponent
  ]
})
export class SharedModule { }
