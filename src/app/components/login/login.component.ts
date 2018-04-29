import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modelos/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  private mensaje:string;
  private status:string;
  public user: User;
  private identity;
  private token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.user = new User("", "", "", "", "");
  }

  ngOnInit() {}

  onSubmit() {
    this._userService.signUp(this.user)
    .subscribe(
      response => {
        this.identity = response.user;
        if(this.identity && this.identity._id){
            localStorage.setItem('identity', JSON.stringify(this.identity));

            this.getToken();

        } else {
          //persistit
          this.status = "error";
          this.mensaje = response.message;
        }
      }, error => {
          var errorMessage = <any>error;
          if(errorMessage) {
            this.mensaje = errorMessage.error.message;
            this.status = "warning";
          }
      }
    )
  }

  getToken() {
    this._userService.signUp(this.user, true)
    .subscribe(
      response => {
          if(response.token.length >= 0){
            this.token = response.token;
            localStorage.setItem('token', this.token);
            this._router.navigate(['/home']);
          }
      }, error => {
          var errorMessage = <any>error;
          if(errorMessage) {
            this.mensaje = errorMessage.error.message;
            this.status = "warning";
          }
      }
    )
  }

}
