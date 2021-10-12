import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/home';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.isLoading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                this.user = data;
                
                if(this.user.name === "admin")
                {
                  window.location.reload();
                  this.router.navigate([this.returnUrl]);
                }
                else
                {
                  this.router.navigate(['/student/home']);
                  window.location.reload();
                }
                  
                //   window.location.reload();
                  // this.courseService.user=data;
                  // this.router.navigate(['/test']);
                  // this.router.navigate(['/']);
                  // console.log(jwt_decode(this.courseService.user.token));
                  console.log(data);
              },
              error => {
                  this.error = error;
                  this.isLoading = false;
              });
  }

  SignUp(){
      this.router.navigate(['/register']);
  }

}
