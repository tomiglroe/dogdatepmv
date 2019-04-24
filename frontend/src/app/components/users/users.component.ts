import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})

export class UsersComponent implements OnInit {

  title: string;
  url: string;
  identity;
  token;
  page;
  next_page;
  prev_page;
  total;
  pages;
  users: User[];
  follows;
  status: string;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {

    this.title = 'Perros';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {

    console.log('users.componente ha sido cargado');
    this.actualPage();
  }

  // ngDoCheck() {

  //   this.identity = this._userService.getIdentity;

  // }

  actualPage() {

    this._route.params.subscribe(params => {

      let page = +params['page'];
      this.page = page;

      if (!params['page']) {

        page = 1;
      }

      if (!page) {

        page = 1;

      } else {

        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <=0) {

          this.prev_page = 1;
        }
      }
      //Devuelvo listado de usuarios
      this.getUsers(page);
    });
  }
  getUsers(page) {

    this._userService.getUsers(page).subscribe(

      response => {

        if(!response.users) {

          this.status = 'error';

        } else {

          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;

          if (page > this.pages) {
            this._router.navigate(['/perros', 1]);
          }
        }
      },
      error => {

        let errorMessage = <any>error;
        console.log(errorMessage);
        
        if (errorMessage != null) {

          this.status = 'error';
        }
      }
    );
  }

  followUserOver;

  mouseEnter (user_id) {
    this.followUserOver = user_id;
  }

  mouseLeave (user_id) {
    this.followUserOver = 0;
  }
}
