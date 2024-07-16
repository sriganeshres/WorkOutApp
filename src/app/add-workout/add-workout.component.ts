import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['../../styles.css'],
})
export class AddWorkoutComponent implements OnInit {
  workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance'];
  workOutService: WorkoutService = inject(WorkoutService);
  workouts: Workout[] = [];
  createForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    workOutType: new FormControl('', Validators.required),
    workOutDuration: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  ngOnInit() {
    this.loadWorkouts();
  }

  async loadWorkouts() {
    this.workouts = await this.workOutService.getAllWorkouts();
  }

  async submitApplication() {
    if (this.createForm.invalid) {
      const errors = [];
      if (this.createForm.get('username')?.hasError('required')) {
        errors.push('Please enter a username.');
      }
      if (this.createForm.get('workOutType')?.hasError('required')) {
        errors.push('Please select a workout type.');
      }
      if (
        this.createForm.get('workOutDuration')?.hasError('required') ||
        this.createForm.get('workOutDuration')?.hasError('min')
      ) {
        errors.push('Please enter a workout duration greater than 0.');
      }
      alert(errors.join('\n'));
    } else {
      const formValue = this.createForm.value;
      const workout: Workout = {
        userName: formValue.userName || '',
        workOutType: formValue.workOutType || '',
        workOutDuration: formValue.workOutDuration || 0,
      };
      await this.workOutService.addWorkout(workout);
      this.createForm.reset();
      this.loadWorkouts();
    }
  }
}
