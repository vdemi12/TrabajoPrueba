import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeriesPage } from './series.page';
import { SeriesPageRoutingModule } from './series-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SeriesPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SeriesPage]
})
export class SeriesPageModule { }
