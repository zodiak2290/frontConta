import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../modelos/user';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  private status: string;
  private mensaje: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.user = new User("", "", "", "", "");
   }

  ngOnInit() {}

  onSubmit(registerForm){
    this._userService.register(this.user)
    .subscribe(
      response => {
          if(response.user && response.user._id){
            this.status = "success";
            this.mensaje = "Registro exitoso!";
            registerForm.reset();
          } else {
            this.status = "warning";
            this.mensaje = response.message;
          }
      }, error => {
          console.log(<any>error);
      }
    );
    //console.log(this.UserService);
  }

}
