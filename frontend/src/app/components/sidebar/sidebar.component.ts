import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, PublicationService, UploadService]
})

export class SidebarComponent implements OnInit {

  identity;
  token;
  stats;
  url;
  status;
  publication: Publication;

  constructor(

    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication(
      "",
      "",
      "",
      "",
      this.identity._id
      );
  }

  ngOnInit() {}

  onSubmit(form, $event) {

    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {

          if (this.filesToUpload && this.filesToUpload.length) {
            //Subo imagen
            this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {

                this.status = 'success';
                this.publication.file = result.image;
                form.reset();
                this._router.navigate(['/muro']);
                this.sended.emit({ send: 'true' });
              });
          } else {

            this.status = 'success';
            form.reset();
            this._router.navigate(['/muro']);
            this.sended.emit({ send: 'true' });
          }

        } else {

          this.status = 'error';
        }
      },
      error => {

        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // Output
  @Output() sended = new EventEmitter();
  sendPublication(event) {
    this.sended.emit({ send: 'true' });
  }

}