import { Component, OnInit, DoCheck } from '@angular/core';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [UserService]

})
export class NavComponent implements OnInit, DoCheck {

  public title = 'dOGdATE';
  public identity;

  constructor (

    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {}

  ngOnInit() {

    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {

    this.identity = this._userService.getIdentity();
  }

  logout() {

    localStorage.clear();
    this.identity = null;
  }
}
