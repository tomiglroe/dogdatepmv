import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, FollowService]

})
export class ProfileComponent implements OnInit, DoCheck {

  title: string;
  user: User;
  status: string;
  identity;
  token;
  url;
  stats;
  followed;
  following;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {

    this.title = 'Datos de la cuenta ';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.following = false;
    this.followed = false;
  }

  ngOnInit() {

    console.log('profile.component cargado correctamente');
    this.loadPage();
  }

  ngDoCheck() {

  }

  loadPage() {

    this._route.params.subscribe(params => {

      let id = params['id'];

      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id) {

    this._userService.getUser(id).subscribe(

      response => {

        if (response.user) {

          this.user = response.user;

          if (response && response.following && response.following._id) {

            this.following = true;

          } else {

            this.following = false;
          }

          if (response && response.followed && response.followed._id) {

            this.followed = true;

          } else {

            this.followed = false;
          }
        } else {

          this.status = 'error';
        }
      },
      error => {

        this._router.navigate(['/perfil', this.identity._id]);
        console.log(<any>error);

      }
    );
  }

  getCounters(id) {

    this._userService.getCounters(id).subscribe(

      response => {

        this.stats = response;
      },
      error => {

        console.log((<any>error));
      }
    );
  }

  followUser(followed) {

    let follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(

      response => {

        this.following = true;
      },
      error => {

        console.log(<any>error);
      }
    );
  }

  unFollowUser (followed) {

    this._followService.deleteFollow(this.token, followed).subscribe(

      response => {

        this.following = false;
      },
      error => {

        console.log(<any>error);
        
      }
    );
  }
}