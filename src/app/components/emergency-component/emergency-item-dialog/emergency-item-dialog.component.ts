import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EmergencyOrder } from '../../../interfaces/emergency-order.interface';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-emergency-item-dialog',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent],
  templateUrl: './emergency-item-dialog.component.html',
  styleUrl: './emergency-item-dialog.component.css'
})
export class EmergencyItemDialogComponent{

private readonly emergencyOrderService=inject(EmergencyOrderService);
private readonly destroy$ = new Subject<void>();
@Output() close = new EventEmitter<void>(); 
@Input() Order : EmergencyOrder={};
@Input() isPharmacy : boolean=false;
isLoading=false;

closeDialog(): void {
  this.close.emit(); // Emit the close event
}


onSubmit()
{
  this.isLoading=true;
      const submittedOrder: EmergencyOrder ={
        ...this.Order,
        isSubmet:true,
      };
      this.emergencyOrderService.updateOrder(this.Order.emergencyOrderId! , submittedOrder).pipe(takeUntil(this.destroy$)).subscribe({
        next:()=>{
          this.isLoading=false;
          this.closeDialog();
        },
      });
  
    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}





