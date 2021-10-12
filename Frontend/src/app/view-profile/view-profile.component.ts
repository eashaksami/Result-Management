import { User } from '../_models/user';
import { ViewService } from './../_services/view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  students: User[];

  constructor(private viewService: ViewService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(){
    this.viewService.viewAllStudent()
    .subscribe((student: User[]) => {
      console.log(student);
      this.students = student;
    });
  }

  deleteUser(userId: number){
    this.viewService.deleteStudent(+userId)
    .subscribe( () => {
      alert("Student Deleted Successfully!!!");
    });
  }

}
