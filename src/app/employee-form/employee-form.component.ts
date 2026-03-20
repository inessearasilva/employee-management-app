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

        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => this.employee = result,
          error: (err) => this.errorMessage = `Error occurred (${err.status})`
        })
      }

    });
  }

  onSubmit(): void {

    if (this.isEditing) {
      this.employeeService.editEmployee(this.employee)
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = `Error occurred during update: ${err.status} - ${err.message}`;
          }
        });
    } else {
      this.employeeService.createEmployee(this.employee)
        .subscribe({
          next: () => {
            this.router.navigate(['/'])
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = `Error occurred during creating: ${err.status} - ${err.message}`;
          }
        });
    }
  }
}
