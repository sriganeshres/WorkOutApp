import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import {
  NgxChartsModule,
  Color,
  colorSets,
  ScaleType,
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['../../styles.css'],
})
export class UserDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  user: User | undefined = undefined;
  chartData: any[] = [];
  colorScheme!: Color;

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    console.log(`Fetching user with ID: ${userId}`);

    this.userService
      .getUserByID(userId)
      .then((user) => {
        if (user) {
          console.log('User fetched:', user);
          this.user = user;
          this.chartData = this.user.workouts.map((workout) => ({
            name: workout.workOutType,
            value: workout.workOutDuration,
          }));

          // Define your custom color scheme
          this.colorScheme = {
            name: 'custom',
            selectable: true,
            group: ScaleType.Ordinal,
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
          };
        } else {
          console.log('User not found with ID:', userId);
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }

  routeToHome() {
    this.router.navigate(['/']);
  }

  formatYAxisTick(value: number) {
    return value + ' mins'; // Example format: 10 mins, 20 mins, etc.
  }

  getYAxisDomain(): number[] {
    if (this.chartData.length === 0) {
      return [0, 10]; // Default range when no data is available
    } else {
      // Determine max duration
      const maxDuration = Math.max(...this.chartData.map((item) => item.value));

      // Calculate bin size based on max duration
      const binSize = Math.ceil(maxDuration / 5); // Adjust the number of bins as needed

      // Create bins array dynamically based on max duration
      const bins = Array.from({ length: 6 }, (_, i) => i * binSize);

      // Ensure the last bin covers the maximum value
      bins[bins.length - 1] = maxDuration;

      return bins;
    }
  }
}
