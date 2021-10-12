import { UpdateResultService } from './../_services/update-result.service';
import { ResultView } from './../_models/resultView';
import { ViewService } from './../_services/view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-result',
  templateUrl: './batch-result.component.html',
  styleUrls: ['./batch-result.component.css']
})
export class BatchResultComponent implements OnInit {

  batches: string[];
  selectedBatch: string;
  selectedSemester: string;
  semesters: string[] = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  results: ResultView[];
  getResult: boolean = false;
  onClickChange: boolean = false;
  midNumber: number;
  ctMark: number;
  finalMark: number;
  quizMark: number;
  index: number = null;
  name: any;

  constructor(private viewService: ViewService, private updateResultService: UpdateResultService) { }

  ngOnInit(): void {
    this.getBatches();
  }

  getBatches(){
    this.viewService.getBatches()
    .subscribe((data: string[]) =>  {
      console.log(data);
      this.batches = data;
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

  changeInfo(i: number){
    this.onClickChange = true;
    this.index = i;
  }

  getData(){
    this.viewService.viewBySemesterAndBatch(this.selectedSemester, this.selectedBatch)
    .subscribe((data: ResultView[]) =>{
      this.results = data;
      this.getResult = true;
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

  editResult(studentId: number, courseCode: number, batch: string, semester: string, midMarks: number, ctMarks: number, quizMarks: number, finalMarks: number){
    if(this.quizMark == null) this.quizMark = quizMarks;
    if(this.midNumber == null) this.midNumber = midMarks;
    if(this.ctMark == null) this.ctMark = ctMarks;
    if(this.finalMark == null) this.finalMark = finalMarks;

    this.updateResultService.updateResult(+studentId, +courseCode, batch, semester, +this.quizMark, +this.ctMark, +this.midNumber, +this.finalMark)
    .subscribe(() =>{
      this.getData();
      alert("Changes Saved Successfully!!!!");
      this.onClickChange = false;
      this.index = null;
    });
  }

  deleteRecord(studentId: number, courseCode: number){
    this.updateResultService.deleteResult(+studentId, +courseCode)
    .subscribe((data) => {
      console.log(data);
      this.getData();
      alert("Record Deleted Successfully")
    });
  }

  Search(){
    if(this.name == "")
    {
      this.getData();
    }
    else{
      this.results = this.results.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

}
