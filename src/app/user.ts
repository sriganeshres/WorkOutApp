import { Workout } from './workout';

export interface User {
  id: number;
  userName: string;
  workouts: Workout[];
}
