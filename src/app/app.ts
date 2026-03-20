import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { EmployeeTableComponent} from './employee-table/employee-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeTableComponent, RouterModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('employee-management-app');
}
