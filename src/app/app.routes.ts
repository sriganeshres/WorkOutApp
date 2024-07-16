import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'add-workout',
    component: AddWorkoutComponent,
    title: 'Add Workout',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
];
