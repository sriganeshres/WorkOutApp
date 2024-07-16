import { Injectable } from '@angular/core';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor() {}

  workouts: Workout[] = [];

  async getAllWorkouts(): Promise<Workout[]> {
    return this.workouts;
  }

  async addWorkout(workout: Workout): Promise<void> {
    this.workouts.push(workout);
  }

  async getAllWorkoutByType(type: string): Promise<Workout[]> {
    return this.workouts.filter((w) => w.workOutType === type);
  }

  async getWorkoutByUser(userName: string): Promise<Workout[]> {
    return this.workouts.filter((w) => w.userName === userName);
  }
}
