import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor(
    private msalService: MsalService
  ) {}


  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise()
      .then(res => {
        if(res?.account) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      })
  }
  
  isLoggedIn() {
    return this.msalService.instance.getActiveAccount() != null
  }



}
