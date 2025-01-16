import { Component } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Trainee } from '../../../../interfaces/trainee.interface';
import { TraineeService } from '../../../../services/trainee.service';
import { ManagerTraineeDailogComponent } from "../manager-trainee-dailog/manager-trainee-dailog.component";

@Component({
  selector: 'app-manager-trainee-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, ManagerTraineeDailogComponent],
  templateUrl: './manager-rigest-trainee-table.component.html',
  styleUrl: './manager-rigest-trainee-table.component.css'
})
export class ManagerRigestTraineeTableComponent {
  isLoading = false;
  trainees: Trainee[] = [];
  isView=false;
  selectedTrainee?: Trainee;
  constructor(private traineeService: TraineeService) { }

  ngOnInit(): void {
    this.loadTrainees();
  }

  loadTrainees(): void {
    this.isLoading = true;
    this.traineeService.getAllTrainees().subscribe({
      next: (data) => {
        this.trainees = data
        this.isLoading = false
      },
      error: (err) => console.error('Error fetching trainees:', err),
    });
  }
  deleteTrainee(traineeId: string)
  {
    if (confirm('Are you sure you want to delete this trainee?'))
      {
        this.traineeService.deleteTrainee(traineeId).subscribe({
          next:()=>{
            this.loadTrainees();
          }
        })
      }
  }
  openTraineeRecord(trainee: Trainee) 
  {
    this.isView=true;
    this.selectedTrainee=trainee;
  }
  closeAll(): void {
    this.isView = false;
  }
}

