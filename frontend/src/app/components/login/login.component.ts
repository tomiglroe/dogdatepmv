import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {

    this.title = 'Identifícate';
    this.user = new User(
      "",
      "",
      "",
      "",
      "",
      ""
    )
  }

  ngOnInit() {

    console.log('Componente de Login cargado...');
  }

  onSubmit() {

    this._userService.login(this.user).subscribe(

      response => {

        this.identity = response.user;

        console.log(this.identity);
        

        if (!this.identity || !this.identity._id) {

          this.status = 'error';

        } else {

          this.status = 'success';
          //guardar en localstorage

          this.getToken();

        }
      },

      error => {

        let errorMessage = <any>error;
        if (errorMessage != null) {

          this.status = 'error';
        }
      }
    );
  }
  getToken() {
    this._userService.login(this.user, 'true').subscribe(

      response => {

        this.token = response.token;

        console.log(this.token);
        

        if (this.token.length <= 0) {

          this.status = 'error';

        } else {

          this.status = 'success';
          //guardar en localstorage

        }
      },
      error => {

        let errorMessage = <any>error;
        if (errorMessage != null) {

          this.status = 'error';
        }
      }
    );
  }
}
