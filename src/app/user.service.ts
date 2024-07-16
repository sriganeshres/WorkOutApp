import { Injectable } from '@angular/core';
import { User } from './user';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  users: User[] = [
    {
      id: 1,
      userName: 'John Doe',
      workouts: [
        { workOutType: 'Running', workOutDuration: 30 },
        { workOutType: 'Cycling', workOutDuration: 45 },
      ],
      totalDuration: 75,
    },
    {
      id: 2,
      userName: 'Jane Smith',
      workouts: [
        { workOutType: 'Swimming', workOutDuration: 60 },
        { workOutType: 'Running', workOutDuration: 20 },
      ],
      totalDuration: 80,
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      workouts: [
        { workOutType: 'Yoga', workOutDuration: 50 },
        { workOutType: 'Cycling', workOutDuration: 40 },
      ],
      totalDuration: 90,
    },
  ];

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
      user.totalDuration += workout.workOutDuration;
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        userName,
        workouts: [workout],
        totalDuration: workout.workOutDuration,
      };
      this.users.push(newUser);
    }
  }

  async getUserByID(ID: string): Promise<User | undefined> {
    console.log('getUserByID is working on type ' + typeof Number(ID));
    return this.users.find((u) => u.id === Number(ID));
  }
}
