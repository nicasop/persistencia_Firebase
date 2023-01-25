import { Component, OnInit } from '@angular/core';
import { FireauthService } from './services/fireauth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  uid: string | undefined;
  flag!: number;
  constructor( private autentication: FireauthService) {
  }

  ngOnInit(){
    this.uid = this.autentication.getUid();
    console.log(this.uid)
    if (this.uid != undefined){
     if (this.uid == "SEa1WCmkI8gUWE5TLErFgvGgG2L2") {
      this.flag = 1;
     }
     else {
      this.flag = 2;
     }
    }
    else{
      this.flag = 0;
    }
  }


}
