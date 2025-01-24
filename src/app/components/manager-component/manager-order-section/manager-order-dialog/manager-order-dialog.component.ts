import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmergencyOrder, Item } from '../../../../interfaces/emergency-order.interface';
import { EmergencyOrderService } from '../../../../services/emergency-order.service';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-manager-order-dialog',
  standalone: true,
  imports: [LoadingImageComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './manager-order-dialog.component.html',
  styleUrl: './manager-order-dialog.component.css'
})
export class ManagerOrderDialogComponent {
  private readonly destroy$ = new Subject<void>();
  private readonly emergencyOrderService = inject(EmergencyOrderService);
  @Output() close = new EventEmitter<void>();
  @Input() order:EmergencyOrder={};
  isEdit = false;
  isLoading = false;
  items: Item[] = [];
  currentItem: Item = {};

  itemForm = new FormGroup({
    Description: new FormControl('', [Validators.required]),
    Quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    Unit: new FormControl('', [Validators.required]),
    note: new FormControl(''),
  });

  ngOnInit(): void {
    this.items=this.order.items!;
    this.saveItemsToSessionStorage();
  }

  private saveItemsToSessionStorage(): void {
    sessionStorage.setItem('items', JSON.stringify(this.items));
  }
  closeDialog(): void {
    this.close.emit(); // Emit the close event
  }
  addItem(): void {
    const newItem: Item = {
      description: this.itemForm.get('Description')?.value ?? '',
      quantity: this.itemForm.get('Quantity')?.value ?? '',
      unit: this.itemForm.get('Unit')?.value ?? '',
      note: this.itemForm.get('note')?.value ?? '',
    };

    if (this.isEdit) {
      // Update the existing item
      const index = this.items.findIndex(item => item === this.currentItem);
      if (index !== -1) {
        this.items[index] = { ...newItem }; // Update the item
      }
      this.isEdit = false; // Reset edit mode
    } else {
      // Add the new item
      this.items.push(newItem);
    }
  
    this.saveItemsToSessionStorage();
    this.resetForm();
  }

  editItem(item: Item): void {
    this.isEdit = true;
    this.currentItem = item ;
    this.itemForm.patchValue({
      Description: this.currentItem.description,
      Quantity: this.currentItem.quantity,
      Unit: this.currentItem.unit,
      note: this.currentItem.note,
    });
  }

  deleteItem(index: number): void {
    const confirmed = confirm('هل أنت متأكد من حذف هذا العنصر؟');
    if (confirmed) {
      this.items.splice(index, 1);
      this.saveItemsToSessionStorage();
    }
    if(this.items.length==0)
      {
        this.closeDialog();
        this.emergencyOrderService.deleteOrder(this.order.emergencyOrderId!).pipe(takeUntil(this.destroy$)).subscribe({
          next:()=>{
            alert('تم حذف الطلب بسبب خلوه من العناصر');
            sessionStorage.removeItem('items');
          }
        });
      }
  }

  resetForm(): void {
    this.isEdit = false;
    this.currentItem = {};
    this.itemForm.reset();
    Object.keys(this.itemForm.controls).forEach((controlName) => {
      this.itemForm.get(controlName)?.markAsUntouched();
    });
  }

onSubmit()
{
  this.isLoading=true;
      const submittedOrder: EmergencyOrder ={
        ...this.order,
        items:this.items,
        isApprove:true,
      };
      this.emergencyOrderService.updateOrder(this.order.emergencyOrderId! , submittedOrder).pipe(takeUntil(this.destroy$)).subscribe({
        next:()=>{
          this.isLoading=false;
          this.closeDialog();
          sessionStorage.removeItem('items');
        },
        error:(er)=>{
          console.error(er);
        }
      });
    }

    unApprove()
    {
      this.isLoading=true;
      const submittedOrder: EmergencyOrder ={
        ...this.order,
        items:this.items,
        isApprove:false,
      };
      this.emergencyOrderService.updateOrder(this.order.emergencyOrderId! , submittedOrder).pipe(takeUntil(this.destroy$)).subscribe({
        next:()=>{
          this.isLoading=false;
          this.closeDialog();
          sessionStorage.removeItem('items');
        },
        error:(er)=>{
          console.error(er);
        }
      });
    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
