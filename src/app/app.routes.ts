import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'add-workout',
    component: AddWorkoutComponent,
    title: 'Add Workout',
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    title: 'User Details',
  },
];
