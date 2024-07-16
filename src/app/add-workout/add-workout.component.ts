import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-workout.component.html',
  styleUrl: '../../styles.css',
})
export class AddWorkoutComponent {
  workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance'];
  workOutService: WorkoutService = inject(WorkoutService);
  createForm = new FormGroup({
    username: new FormControl('', Validators.required),
    workOutType: new FormControl('', Validators.required),
    workOutDuration: new FormControl(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  submitApplication() {
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
      this.workOutService.addWorkout(
        this.createForm.value
      );
    }
  }
}
