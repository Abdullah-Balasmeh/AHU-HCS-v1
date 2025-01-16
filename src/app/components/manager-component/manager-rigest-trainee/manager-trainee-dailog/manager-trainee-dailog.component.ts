import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { AttendanceRecord, } from '../../../../interfaces/trainee.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-trainee-dailog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-trainee-dailog.component.html',
  styleUrl: './manager-trainee-dailog.component.css'
})
export class ManagerTraineeDailogComponent implements OnInit {
  enterDate ={
    date:'',
    day:'',
    time:''
  };
  leaveDate ={
    date:'',
    day:'',
    time:''
  };
  ngOnInit(): void {
  this.traineeRecord={
      enterDate: new Date(),
      leaveDate: new Date(),
    }
    this.enterDate= this.formatDate(this.traineeRecord.enterDate!)
    this.leaveDate= this.formatDate(this.traineeRecord.leaveDate!)
  }
  @Output() close = new EventEmitter<void>(); 
  @Input()traineeRecord: AttendanceRecord={};

  formatDate(dateString: Date): { date: string; time: string; day: string } {
    const dateObj = new Date(dateString);
  
    // Format the date in 'MM/DD/YYYY' format
    const date =`${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
    // Format the time in 12-hour format with AM/PM
    const time = dateObj
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace('AM', 'ص')
      .replace('PM', 'م');
  
    // Get the day name in Arabic
    const day = dateObj.toLocaleDateString('ar-EG', { weekday: 'long' });
  
    return { date, time, day };
  }

  closeDialog(): void {
    this.close.emit();
  }
}
