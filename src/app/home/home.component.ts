import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Workout } from '../workout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: '../../styles.css',
})
export class HomeComponent {
  users: User[] = [];
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  constructor() {
    this.userService.getAllUsers().then((users: User[]) => {
      this.users = users;
    });
  }

  routeToAddWorkout() {
    this.router.navigate(['/add-workout']);
  }

  formatWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((workout) => workout.workOutType).join(', ');
  }
}
