import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeasonsPage } from './seasons.page';
import { SeasonsPageRoutingModule } from './seasons-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SeasonsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [SeasonsPage]
})
export class SeasonsPageModule { }
