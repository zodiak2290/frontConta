import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;
  private token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
      this.title = 'Contabilidad';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  toggleSidebar(){
    $("#wrapper").toggleClass("toggled");
  }

}
