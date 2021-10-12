import { ResultView } from './../_models/resultView';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class UpdateResultService{
    baseUrl = 'https://localhost:4001/';


    constructor(private http: HttpClient) {}

    updateResult(userId: number, courseCode: number, batch: string, semester: string, quizMarks: number, classWorkMarks: number, midMarks: number, finalMarks: number)
    {
        return this.http.put<ResultView>(this.baseUrl + 'ExamResult',{ userId, courseCode, batch, semester, quizMarks, classWorkMarks, midMarks, finalMarks })
        .pipe(map((response =>{<ResultView>response})));       
    }

    addNewResult(userId: number, courseCode: number, batch: string, semester: string, quizMarks: number, classWorkMarks: number, midMarks: number, finalMarks: number)
    {
        return this.http.post<ResultView>(this.baseUrl + 'ExamResult',{ userId, courseCode, batch, semester, quizMarks, classWorkMarks, midMarks, finalMarks })
        .pipe(map((response =>{<ResultView>response})));       
    }

    deleteResult(userId: number, courseCode: number)
    {
        return this.http.delete<ResultView>(this.baseUrl + 'ExamResult/' + userId +"/" + courseCode)
        .pipe(map((response =>{<ResultView>response})));       
    }
}