import { Component, OnInit, DoCheck } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [UserService]

})
export class NavComponent implements OnInit, DoCheck {

  title = 'DogDate';
  identity;
  url: string;

  constructor (

    private _userService: UserService,
    private _router: Router

  ) {

    this.url = GLOBAL.url;
  }

  ngOnInit() {

    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {

    this.identity = this._userService.getIdentity();
  }

  logout() {

    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
