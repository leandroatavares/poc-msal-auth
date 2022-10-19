import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export function MSALINstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'c22d1871-6575-4a4f-856b-0a3e8227887c',
      redirectUri: 'http://localhost:4200/home-page'
    }
  })
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read, mail.read'])
  protectedResourceMap.set('https://viacep.com.br/*', ['api://c22d1871-6575-4a4f-856b-0a3e8227887c/user.test/meucep'])
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: MSAL_INSTANCE, useFactory: MSALINstanceFactory },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
