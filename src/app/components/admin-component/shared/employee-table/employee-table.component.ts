import { Component, OnInit, signal } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/users.interface';
import { UserService } from '../../../../services/user.service';
import { EmployeeEditComponent } from "../employee-edit/employee-edit.component";

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EmployeeEditComponent],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  users: User[] = [];
  selectedUser: any = null;
  isLoading = signal<boolean>(true);
  constructor(private readonly userService: UserService) {}
  isEditModalOpen =signal<boolean>(false);
  showTab: boolean = true;
  ngOnInit(): void {
    this.loadUsers();
  }

  // Fetch users from the API
  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data || []; // Ensure users is an array
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }

  // Delete a user by ID
  deleteUser(userId: string): void {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers(); // Reload the user list
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Error deleting user.');
        },
      });
    }
  }
  openEditModal(user: any): void {
    this.selectedUser=user;
    console.log(user);
    this.isEditModalOpen.set(true) ; 
    this.showTab = false;
  }
  closeDialog()
  {
    this.isEditModalOpen.set(false);
    this.showTab = true;
  }
  
}
