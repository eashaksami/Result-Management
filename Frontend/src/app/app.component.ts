import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Result Management';

  currentUser: User;
    isLoggedIn: boolean;
    isAdmin: boolean;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
      var user = this.authenticationService.getUsername();
      if(user==null)
      {
          this.isLoggedIn = false;
      }
      else
      {
          this.isLoggedIn = true;
          if(this.authenticationService.getUsername().name === "admin")
          {
            this.router.navigate(['/admin/home']);
            this.isAdmin = true;
          }
          else
          {
            this.router.navigate(['/student/home']);
            this.isAdmin = false;
          }
      }
  }

  logout() {
      this.authenticationService.logout();
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/login']);
  }

  SignUp(){
    this.router.navigate(['/register'])
  }

  LogIn(){
    this.router.navigate(['/login']);
  }
}
