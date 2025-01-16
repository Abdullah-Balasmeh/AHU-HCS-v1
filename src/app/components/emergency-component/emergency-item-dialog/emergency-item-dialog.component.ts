import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EmergencyOrder } from '../../../interfaces/emergency-order.interface';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-emergency-item-dialog',
  standalone: true,
  imports: [CommonModule, LoadingImageComponent,ReactiveFormsModule],
  templateUrl: './emergency-item-dialog.component.html',
  styleUrl: './emergency-item-dialog.component.css'
})
export class EmergencyItemDialogComponent{

private readonly emergencyOrderService=inject(EmergencyOrderService);
@Output() close = new EventEmitter<void>(); 
@Input() Order : EmergencyOrder={};
@Input() isPharmacy : boolean=false;
isLoading=false;
  itemForm = new FormGroup({
    Description: new FormControl('', [Validators.required]),
    Quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    Unit: new FormControl('', [Validators.required]),
    note: new FormControl(''),
  });



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
      this.emergencyOrderService.updateOrder(this.Order.emergencyOrderId! , submittedOrder).subscribe({
        next:()=>{
          this.isLoading=false;
        },
        error:(er)=>{
          console.error(er);
        }
      });
  
    }
}





