import { Component, inject } from '@angular/core';
import { Workout } from '../workout';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: '../../styles.css',
})
export class HomeComponent {
  workouts: Workout[] = [];
  workoutService: WorkoutService = inject(WorkoutService);
  constructor() {
    this.workoutService.getAllWorkouts().then((workouts: Workout[]) => {
      this.workouts = workouts;
    });
  }
}
