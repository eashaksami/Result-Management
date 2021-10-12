import { StudentResult } from './../_models/studentResult';
import { ResultView } from './../_models/resultView';
import { ViewService } from './../_services/view.service';
import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  public student: User;
  public results: StudentResult[];

  constructor(private authenticationService: AuthenticationService,
              private viewService: ViewService) { }

  ngOnInit(): void {
    this.student = this.authenticationService.getUsername();
    this.getResult();
  }

  getResult(){
    this.viewService.viewIndividualResult(+this.authenticationService.getUsername().userId)
    .subscribe((result: StudentResult[]) => {
      this.results = result;
      console.log(this.results);
      this.updateResult();
    });
  }

  updateResult(){
    for(var i in this.results)
    {
      this.results[i].totalMarks = 0;
      this.results[i].totalMarks = this.results[i].midMarks + this.results[i].finalMarks
                                    + this.results[i].quizMarks + this.results[i].classWorkMarks;
      this.results[i].gread = this.getgreade(this.results[i].totalMarks);
    }
  }

  getgreade(totalarks: number){
    let gread: string;
    if(totalarks <40){
      gread = "F";
    }
    else if(totalarks>=40 && totalarks <50){
      gread = "D";
    }
    else if(totalarks>=50 && totalarks <59){
      gread = "C";
    }
    else if(totalarks>=60 && totalarks <69){
      gread = "B";
    }
    else if(totalarks>=70 && totalarks <75){
      gread = "A-";
    }
    else if(totalarks>=75 && totalarks <79){
      gread = "A";
    }
    else if(totalarks>80){
      gread = "A+";
    }
    console.log(gread);
    return gread;
  }

}
