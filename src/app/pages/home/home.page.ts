import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, AnimationController, InfiniteScrollCustomEvent, ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom, Observable, Subscription } from 'rxjs';
import { Serie } from 'src/app/core/models/serie.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Season } from 'src/app/core/models/season.model';
import { SeriesService } from 'src/app/core/services/impl/series.service';
import { SeasonsService } from 'src/app/core/services/impl/seasons.service';
import { TranslateService } from '@ngx-translate/core';
import { SerieModalComponent } from 'src/app/shared/components/serie-modal/serie-modal.component';

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
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ports: Port[] = [];
  port!: Port;
  page_ = 2;
  portsSubscription!: Subscription;
  _series:BehaviorSubject<Serie[]> = new BehaviorSubject<Serie[]>([]);
  series$:Observable<Serie[]> = this._series.asObservable();
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

  selectedSerie: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;


  loadSeries(){
    this.page=1;
    this.serieSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Serie>)=>{
        this._series.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }


  loadMoreSeries(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.serieSvc.getAll(this.page, this.pageSize).subscribe({
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

  async openSerieDetail(serie: any, index: number) {
    await this.presentModalSerie('edit', serie);
    this.selectedSerie = serie;
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
    this.loadMoreSeries(ev.target);
    
  }

  private async presentModalSerie(mode:'new'|'edit', serie:Serie|undefined=undefined){
    let _series:Serie[] = await lastValueFrom(this.serieSvc.getAll())
    const modal = await this.modalCtrl.create({
      component:SerieModalComponent,
      componentProps:(mode=='edit'?{
        serie: serie,
        series: _series
      }:{
        series: _series
      })
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.serieSvc.add(response.data).subscribe({
            next:res=>{
              this.loadSeries();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.serieSvc.update(serie!.id, response.data).subscribe({
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

  async onAddSerie(){
    await this.presentModalSerie('new');
  }

  async onDeleteSerie(serie: Serie) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('SERIES.MESSAGES.DELETE_CONFIRM').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.serieSvc.delete(serie.id).subscribe({
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
