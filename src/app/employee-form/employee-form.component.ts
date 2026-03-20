import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Employee} from '../../models/employee';
import {EmployeeService} from '../employee.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
  standalone: true
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: ""
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        this.isEditing = true;
      }

    });
  }

  onSubmit(): void {
    this.employeeService.createEmployee(this.employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = `Error: ${err.status} - ${err.message}`;
        }
      });
  }
}
