import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Workout } from '../workout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: '../../styles.css',
})
export class HomeComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  nameFilter: string = '';
  workoutTypeFilter: string = '';

  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  constructor() {
    this.userService.getAllUsers().then((users: User[]) => {
      this.users = users;
      this.applyFilters(); // Apply filters initially
    });
  }

  routeToAddWorkout() {
    this.router.navigate(['/add-workout']);
  }

  formatWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((workout) => workout.workOutType).join(', ');
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(
      (user) => this.filterByName(user) && this.filterByWorkoutType(user)
    );
  }

  filterByName(user: User): boolean {
    if (!this.nameFilter.trim()) return true;
    return user.userName.toLowerCase().includes(this.nameFilter.toLowerCase());
  }

  filterByWorkoutType(user: User): boolean {
    if (!this.workoutTypeFilter.trim()) return true;
    return user.workouts.some((workout) =>
      workout.workOutType
        .toLowerCase()
        .includes(this.workoutTypeFilter.toLowerCase())
    );
  }
}
