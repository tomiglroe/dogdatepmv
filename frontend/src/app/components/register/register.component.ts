import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {

    this.title = 'Registra a tu perro';
    this.user = new User(
      "",
      "",
      "",
      "",
      ""
    )
  }

  ngOnInit() {

    console.log('Componente de Registro cargado...');
  }

  onSubmit() {

    this._userService.register(this.user);
    
  }

}
