import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { AddResultComponent } from './add-result/add-result.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { CourseResultComponent } from './course-result/course-result.component';
import { BatchResultComponent } from './batch-result/batch-result.component';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';

const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'admin/home', component: AdminHomePageComponent },
    { path: 'admin/view-batch-result', component: BatchResultComponent},
    { path: 'admin/view-course-result', component: CourseResultComponent},
    { path: 'admin/view-profile', component: ViewProfileComponent},
    { path: 'admin/add-result', component: AddResultComponent},
    { path: 'student/home', component: StudentHomePageComponent },
    // { path: 'image', component: ImageUploadComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);