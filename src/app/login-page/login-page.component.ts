import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private msalService: MsalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.msalService.instance.handleRedirectPromise()
    // .then(res => {
    //   if(res?.account) {
    //     this.msalService.instance.setActiveAccount(res.account)
    //     this.router.navigate(['home-page'])
    //   }
    // })
  }

  login() {
    // this.msalService.loginRedirect()
    this.msalService.loginPopup().subscribe({
      next: (res: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(res.account)
        this.router.navigate(['home-page'])
      }
    })
  }

  isLoggedIn() {
    return this.msalService.instance.getActiveAccount() != null
  }


}
