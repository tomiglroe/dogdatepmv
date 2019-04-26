import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService]
})

export class SidebarComponent implements OnInit, DoCheck {

  identity;
  token;
  stats;
  url;
  status;

  constructor(

    private _userService: UserService
  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {

    console.log('sidebarcomponent ha sido cargado');
    
  }

  ngDoCheck() {}

}