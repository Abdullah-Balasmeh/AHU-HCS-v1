import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { AttendanceRecord, } from '../../../../interfaces/trainee.interface';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-manager-trainee-dailog',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent],
  templateUrl: './manager-trainee-dailog.component.html',
  styleUrl: './manager-trainee-dailog.component.css'
})
export class ManagerTraineeDailogComponent implements OnInit {
  @Input() traineeRecords: AttendanceRecord[] = [];
  @Output() close = new EventEmitter<void>();
  isLoading=false;
  formattedRecords: {
    day: string;
    date: string;
    enterTime: string;
    leaveTime: string;
  }[] = [];

  ngOnInit(): void {
this.loadRecords();
  }
loadRecords()
{
  this.isLoading=true;
  this.formattedRecords = this.traineeRecords.map(record => {
    const enterFormatted = this.formatDate(record.enterDate!);
    const leaveFormatted = this.formatDate(record.leaveDate!);
    
    return {
      day: enterFormatted.day, // Assuming the same day for enter and leave
      date: enterFormatted.date, // Assuming the same date for enter and leave
      enterTime: enterFormatted.time,
      leaveTime: leaveFormatted.time,
    };
  });
  this.isLoading=false;
}
  formatDate(dateString: Date): { date: string; time: string; day: string } {
    const dateObj = new Date(dateString);

    const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

    const time = dateObj
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace('AM', 'ص')
      .replace('PM', 'م');

    const day = dateObj.toLocaleDateString('ar-EG', { weekday: 'long' });

    return { date, time, day };
  }

  closeDialog(): void {
    this.close.emit();
  }
}
