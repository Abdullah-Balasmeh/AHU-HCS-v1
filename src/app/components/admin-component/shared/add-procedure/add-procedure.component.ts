import { Component } from '@angular/core';
import {  Procedures } from '../../../../interfaces/list.interface';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcedureService } from '../../../../services/procedure.service';

@Component({
  selector: 'app-add-procedure',
  standalone: true,
  imports: [LoadingImageComponent,FormsModule,CommonModule],
  templateUrl: './add-procedure.component.html',
  styleUrl: './add-procedure.component.css'
})
export class AddProcedureComponent {
  isLoading = true;
  isEdit = false;
  procedures: Procedures[] = [];
  currentProcedure: Procedures = { proceduresId: 0, name: '' };

  constructor(private readonly procedureService: ProcedureService) {}

  ngOnInit() {
    this.fetchProcedures();
  }

  fetchProcedures() {
    this.isLoading = true;
    this.procedureService.getAllProcedures().subscribe({
      next: (procedures) => {
        this.isLoading = false;
        this.procedures = procedures;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching procedures', err);
      }
    });
  }

  onAdd() {
    if (!this.currentProcedure.name!.trim()) {
      alert('الرجاء إدخال اسم إجراء صالح.');
      return;
    }

    this.procedureService.addProcedure(this.currentProcedure).subscribe({
      next: (newProcedure) => {
        alert('تم إضافة الإجراء بنجاح');
        this.procedures.push(newProcedure);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding procedure', err);
        alert('فشل في إضافة الإجراء.');
      }
    });
  }

  onSave() {
    if (!this.currentProcedure.name!.trim()) {
      alert('الرجاء إدخال اسم إجراء صالح.');
      return;
    }

    this.procedureService.updateProcedure(this.currentProcedure.proceduresId!, this.currentProcedure).subscribe({
      next: () => {
        alert('تم تعديل الإجراء بنجاح');
        const index = this.procedures.findIndex(p => p.proceduresId === this.currentProcedure.proceduresId);
        if (index > -1) {
          this.procedures[index] = { ...this.currentProcedure };
        }
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating procedure', err);
        alert('فشل في تحديث الإجراء.');
      }
    });
  }

  Edit(procedure: Procedures) {
    this.isEdit = true;
    this.currentProcedure = { ...procedure };
  }

  deleteProcedure(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الإجراء؟')) {
      this.procedureService.deleteProcedure(id).subscribe({
        next: () => {
          this.procedures = this.procedures.filter(p => p.proceduresId !== id);
        },
        error: (err) => {
          console.error('Error deleting procedure', err);
          alert('فشل في حذف الإجراء.');
        }
      });
    }
  }

  resetForm() {
    this.isEdit = false;
    this.currentProcedure = { proceduresId: 0, name: '' };
  }
}
