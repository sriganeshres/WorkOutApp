import { Injectable } from '@angular/core';
import { User } from './user';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async addUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async addWorkoutToUser(userName: string, workout: Workout): Promise<void> {
    const user = this.users.find((u) => u.userName === userName);
    if (user) {
      user.workouts.push(workout);
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        userName,
        workouts: [workout],
      };
      this.users.push(newUser);
    }
  }
}
