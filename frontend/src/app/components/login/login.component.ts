import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

    this.title = 'Accede a Dogdate';
    this.user = new User(
      "",
      "",
      "",
      "",
      ""
    )
  }

  ngOnInit() {}

  onSubmit() {

    this._userService.login(this.user).subscribe(

      response => {

        this.identity = response.user;

        if (!this.identity || !this.identity._id) {

          this.status = 'error';

        } else {
          //Guardo datos en el LocalStorage como string porque no admite objetos
          localStorage.setItem('identity', JSON.stringify(this.identity));

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

        if (this.token.length <= 0) {

          this.status = 'error';

        } else {
          //Guardo en localstorage
          localStorage.setItem('token', this.token);

          this.getCounters();
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

  getCounters() {

    this._userService.getCounters().subscribe(

      response => {

        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error => {

        console.log(<any>error);
        
      }
    )
  }
}
