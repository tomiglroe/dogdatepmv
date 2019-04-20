import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router
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

    console.log(this.user);
    
  }

}
