import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewBatchResult(){
    this.router.navigate(['/admin/view-batch-result']);
  }

  viewCourseResult(){
    this.router.navigate(['/admin/view-course-result']);
  }

  viewStudentProfile(){
    this.router.navigate(['/admin/view-profile']);
  }

  AddNewResult(){
    this.router.navigate(['/admin/add-result']);
  }

}
