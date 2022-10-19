import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  userData: any
  cep: any

  profileData: any = null
  driveData: any = null
  messages: any = null
  address: any = null

  constructor(
    private msalService: MsalService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userData = this.msalService.instance.getActiveAccount()
  }

  logout() {
    this.msalService.logout()
  }

  callProfile() {
    this.http.get('https://graph.microsoft.com/v1.0/me').subscribe(
      res => this.profileData = res
    )
  }

  listDrive() {
    this.http.get('https://graph.microsoft.com/v1.0/me/drive/root/children').subscribe(
      res => this.driveData = res
    )
  }

  callMessages(): any {
    this.http.get<any>('https://graph.microsoft.com/v1.0/me/messages').subscribe(
      res => this.messages = res.value
    )
  }

  callCep() {
    this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe(
      res => this.address = res
    )
  }

}
