import { StudentResult } from './../_models/studentResult';
import { Course } from './../_models/courses';
import { ResultView } from './../_models/resultView';
import { User } from '../_models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ViewService{
    baseUrl = 'https://localhost:4001/';


    constructor(private http: HttpClient) {}

    //get all batches
    getBatches(): Observable<string[]>{
        return this.http.get(this.baseUrl+ 'view').pipe(map((response => <string[]>response)));
    }

    viewAllStudent(): Observable<User[]>{
        return this.http.get(this.baseUrl+'view/id').pipe(map((response => <User[]>response)));
    }

    getCourses(): Observable<Course[]>{
        return this.http.get(this.baseUrl+'view/get/all/courses/name').pipe(map((response => <Course[]>response)));
    }

    // viewBatchResult(id: number): Observable<Student>{
    //     return this.http.get(this.baseUrl+'view'+ id).pipe(map((response => <Student>response)));
    // }

    viewBySemesterAndBatch(semester: string, batch: string): Observable<ResultView[]>{
        // console.log(courseCode);
        const params = new HttpParams().set('semester', semester)
                                        .set('batch', batch);
        return this.http.get(this.baseUrl+ 'View/semester/batch/view',{params})
        .pipe(map((response => <ResultView[]>response)));
    }

    viewByCourseCodeAndBatch(courseCode: number, batch: string): Observable<ResultView[]>{
        // console.log(courseCode);
        const params = new HttpParams().set('courseCode', courseCode.toString())
                                        .set('batch', batch);
        return this.http.get(this.baseUrl+ 'View/course/batch',{params})
        .pipe(map((response => <ResultView[]>response)));
    }

    viewIndividualResult(id: number): Observable<StudentResult[]>{
        return this.http.get(this.baseUrl+'StudentView/'+ id).pipe(map((response => <StudentResult[]>response)));
    }

    deleteStudent(userId: number)
    {
        return this.http.delete(this.baseUrl + 'View/' + userId);       
    }
}