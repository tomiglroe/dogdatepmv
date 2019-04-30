import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService, UploadService]
})

export class SidebarComponent implements OnInit, DoCheck {

  identity;
  token;
  stats;
  url;
  publication: Publication;
  status;

  constructor(

    private _userService: UserService
  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication (
      "",
      "",
      "",
      "",
      this.identity._id
    );
  }

  ngOnInit() {
    console.log(this.publication);
    
  }

  ngDoCheck() {}

  onSubmit() {

    console.log(this.publication);
    
  }

}
