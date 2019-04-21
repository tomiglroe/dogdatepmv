import { Component, OnInit, DoCheck } from '@angular/core';
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

    private _userService: UserService

  ) {}

  ngOnInit() {

    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {

    this.identity = this._userService.getIdentity();
  }

}
