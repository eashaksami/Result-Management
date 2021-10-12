import { ViewService } from './../_services/view.service';
import { UpdateResultService } from './../_services/update-result.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../_models/courses';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  selectedBatch: string;
  selectedSemester: string;
  courseCode: number;
  semesters: string[] = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  batches: string[];
  courses: Course[];
  midNumber: number;
  ctMark: number;
  quizMark: number;
  finalMark: number;
  studentId: number;
  batch: string;

  constructor(private updateResultService: UpdateResultService,
              private viewService: ViewService) { }

  ngOnInit() {
    this.getBatches();
    this.getCourses();
  }

  getBatches(){
    this.viewService.getBatches()
    .subscribe((data: string[]) =>  {
      console.log(data);
      this.batches = data;
    });
  }

  getCourses(){
    this.viewService.getCourses()
    .subscribe((data: Course[]) =>  {
      console.log(data);
      this.courses = data;
    });
  }

  batchSelected(batch: string){
    console.log(batch);
    this.selectedBatch = batch;
  }

  semesterSelected(semester: string){
    console.log(semester);
    this.selectedSemester = semester;
  }

  courseSelected(batch: number){
    console.log(batch);
    this.courseCode = batch;
  }

  
  saveChanges() {
    this.updateResultService
    .addNewResult(+this.studentId, +this.courseCode, this.batch, this.selectedSemester,
                  +this.quizMark, +this.ctMark, +this.midNumber, +this.finalMark)
      .subscribe(() =>{
        alert("Record Added Successfully!!!!");
        this.studentId = null;
        this.quizMark = null;
        this.ctMark = null;
        this.midNumber = null;
        this.finalMark = null;
      }, error => {
        console.log('error');
      });
  }
}
