import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WorkOutApp';

  workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance'];

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
      // Proceed with the form submission logic here
      console.log('Form submitted successfully', this.createForm.value);
    }
  }
}
