import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})

export class HomeComponent implements OnInit {

  title: string;
  public identity;

  constructor(

    private _userService: UserService,
  ) {

    this.title = 'Bienvenido a DogDate'
  }

  ngOnInit() {

  }

  ngDoCheck() {

   this.identity = this._userService.getIdentity();
  }
}
