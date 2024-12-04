import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, AnimationController, InfiniteScrollCustomEvent, ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom, Observable, Subscription } from 'rxjs';
import { Serie } from 'src/app/core/models/serie.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Season } from 'src/app/core/models/season.model';
import { SeriesService } from 'src/app/core/services/impl/series.service';
import { SeasonsService } from 'src/app/core/services/impl/seasons.service';
import { TranslateService } from '@ngx-translate/core';
import { SeasonModalComponent } from 'src/app/shared/components/season-modal/season-modal.component';

export class Country {
  public id?: number;
  public name?: string;
  public ports?: Port[];
}
export class Port {
  public id?: number;
  public name?: string;
  public country?: Country;
}
@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.page.html',
  styleUrls: ['./seasons.page.scss'],
})
export class SeasonsPage implements OnInit {
  ports: Port[] = [];
  port!: Port;
  page_ = 2;
  portsSubscription!: Subscription;
  _seasons:BehaviorSubject<Season[]> = new BehaviorSubject<Season[]>([]);
  seasons$:Observable<Season[]> = this._seasons.asObservable();
  public alertYesNoButtons = [
    {
      text: 'No',
      role: 'no'
    },
    {
      text: 'Yes',
      role: 'yes'
    },
  ];
  isWeb: boolean = false;

  constructor(
    private animationCtrl: AnimationController,
    private seasonsSvc:SeasonsService,
    private serieSvc:SeriesService,
    private modalCtrl:ModalController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
    this.isWeb = this.platform.is('desktop');
  }

  ngOnInit(): void {
    this.loadSeries();
  }


  @ViewChildren('avatar') avatars!: QueryList<ElementRef>;
  @ViewChild('animatedAvatar') animatedAvatar!: ElementRef;
  @ViewChild('animatedAvatarContainer') animatedAvatarContainer!: ElementRef;

  selectedSeason: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;


  loadSeries(){
    this.page=1;
    this.seasonsSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Season>)=>{
        this._seasons.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }


  loadMoreSeasons(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.seasonsSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Season>)=>{
          this._seasons.next([...this._seasons.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
    
  }

  async openSeasonDetail(season: any, index: number) {
    await this.presentModalSeason('edit', season);
    this.selectedSeason = season;
    /*
    const avatarElements = this.avatars.toArray();
    const clickedAvatar = avatarElements[index].nativeElement;

    // Obtener las coordenadas del avatar clicado
    const avatarRect = clickedAvatar.getBoundingClientRect();

    // Mostrar el contenedor animado
    this.isAnimating = true;
    

    // Configurar la posición inicial de la imagen animada
    const animatedAvatarElement = this.animatedAvatar.nativeElement as HTMLElement;
    animatedAvatarElement.style.position = 'absolute';
    animatedAvatarElement.style.top = `${avatarRect.top}px`;
    animatedAvatarElement.style.left = `${avatarRect.left}px`;
    animatedAvatarElement.style.width = `${avatarRect.width}px`;
    animatedAvatarElement.style.height = `${avatarRect.height}px`;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(animatedAvatarElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('transform', 'translate(0, 0) scale(1)', `translate(${window.innerWidth / 2 - avatarRect.left - avatarRect.width / 2}px, ${window.innerHeight / 2 - avatarRect.top - avatarRect.height / 2}px) scale(5)`);

    // Iniciar la animación
    await animation.play();

    // Opcional: Puedes agregar lógica adicional después de la animación
    // Por ejemplo, mostrar más información, navegar a otra página, etc.

    // Resetear la animación después de completarla
    //this.isAnimating = false;
    */
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.loadMoreSeasons(ev.target);
    
  }

  private async presentModalSeason(mode:'new'|'edit', season:Season|undefined=undefined){
    let _series:Serie[] = await lastValueFrom(this.serieSvc.getAll())
    const modal = await this.modalCtrl.create({
      component:SeasonModalComponent,
      componentProps:(mode=='edit'?{
        season: season,
        series: _series
      }:{
        series: _series
      })
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.seasonsSvc.add(response.data).subscribe({
            next:res=>{
              this.loadSeries();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.seasonsSvc.update(season!.id, response.data).subscribe({
            next:res=>{
              this.loadSeries();
            },
            error:err=>{}
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }

  async onAddSeason(){
    await this.presentModalSeason('new');
  }

  async onDeleteSeason(season: Season) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('SEASONS.MESSAGES.DELETE_CONFIRM').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.seasonsSvc.delete(season.id).subscribe({
              next: response => {
                this.loadSeries();
              },
              error: err => {}
            });
          }
        }
      ]
    });

    await alert.present();
  }

  

}
