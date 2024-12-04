// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationServiceFactory, AuthMappingFactory, SeriesMappingFactory, SeriesRepositoryFactory, MediaServiceFactory, SeasonsMappingFactory, SeasonsRepositoryFactory, PeopleMappingFactory, PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { SeasonsService } from './core/services/impl/seasons.service';
import { PeopleService } from './core/services/impl/people.service';
import { AUTH_MAPPING_TOKEN, AUTH_ME_API_URL_TOKEN, AUTH_SIGN_IN_API_URL_TOKEN, AUTH_SIGN_UP_API_URL_TOKEN, BACKEND_TOKEN, SERIES_API_URL_TOKEN, SERIES_REPOSITORY_MAPPING_TOKEN, SERIES_RESOURCE_NAME_TOKEN, SEASONS_API_URL_TOKEN, SEASONS_REPOSITORY_MAPPING_TOKEN, SEASONS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, UPLOAD_API_URL_TOKEN } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
import { SeasonsLocalStorageMapping } from './core/repositories/impl/seasons-mapping-local-storage.service';
import { SeasonsMappingJsonServer } from './core/repositories/impl/seasons-mapping-json-server.service';
import { PeopleLocalStorageMapping } from './core/repositories/impl/people-mapping-local-storage.service';
import { PeopleMappingJsonServer } from './core/repositories/impl/people-mapping-json-server.service';
import { SeriesMappingJsonServer } from './core/repositories/impl/series-mapping-json-server.service';
import { SeriesService } from './core/services/impl/series.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SeasonsMappingStrapi } from './core/repositories/impl/seasons-mapping-strapi.service';
import { PeopleMappingStrapi } from './core/repositories/impl/people-mapping-strapi.service';
import { SeriesMappingStrapi } from './core/repositories/impl/series-mapping-strapi.service';
import { StrapiAuthMappingService } from './core/services/impl/strapi-auth-mapping.service';
import { StrapiAuthenticationService } from './core/services/impl/strapi-authentication.service';
import { BaseAuthenticationService } from './core/services/impl/base-authentication.service';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';


// Factory function para el loader de traducción
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({
      player: () => player,
    }),
    provideHttpClient(),
    { provide: BACKEND_TOKEN, useValue: 'strapi' },
    { provide: SEASONS_RESOURCE_NAME_TOKEN, useValue: 'seasons' },
    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'people' },
    { provide: SERIES_RESOURCE_NAME_TOKEN, useValue: 'series' },
    { provide: SEASONS_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: PEOPLE_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: SERIES_API_URL_TOKEN, useValue: `${environment.apiUrl}/api` },
    { provide: AUTH_SIGN_IN_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local` },
    { provide: AUTH_SIGN_UP_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/auth/local/register` },
    { provide: AUTH_ME_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/users/me` },
    { provide: UPLOAD_API_URL_TOKEN, useValue: `${environment.apiUrl}/api/upload` },
    
    SeasonsMappingFactory,
    PeopleMappingFactory,
    SeriesMappingFactory,
    AuthMappingFactory,
    SeasonsRepositoryFactory,
    PeopleRepositoryFactory,
    SeriesRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    },
    {
      provide: 'SeasonsService',
      useClass: SeasonsService
    },
    {
      provide: 'SeriesService',
      useClass: SeriesService
    },
    AuthenticationServiceFactory,
    MediaServiceFactory

    // ... otros proveedores],

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}