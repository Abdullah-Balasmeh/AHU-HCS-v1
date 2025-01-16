import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmergencyOrder, Item } from '../../../interfaces/emergency-order.interface';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-emergency-order-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingImageComponent],
  templateUrl: './emergency-order-request.component.html',
  styleUrls: ['./emergency-order-request.component.css']
})
export class EmergencyOrderRequestComponent implements OnInit {
  private readonly emergencyOrderService = inject(EmergencyOrderService);

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
    // Load items from sessionStorage on component initialization
    const storedItems = sessionStorage.getItem('items');
    this.items = storedItems ? JSON.parse(storedItems) : [];
  }

  private saveItemsToSessionStorage(): void {
    // Save the items array to sessionStorage
    sessionStorage.setItem('items', JSON.stringify(this.items));
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
  }

  resetForm(): void {
    this.isEdit = false;
    this.currentItem = {};
    this.itemForm.reset();
    Object.keys(this.itemForm.controls).forEach((controlName) => {
      this.itemForm.get(controlName)?.markAsUntouched();
    });
  }
  getLocalDate = (): string => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the offset in milliseconds
    const localTime = new Date(now.getTime() - offset); // Adjust for local time
    return localTime.toISOString(); 
    
};
  onSaveOrder(): void {
    this.isLoading=true;
    if (this.items.length === 0) {
      alert('يرجى إضافة عنصر على الأقل');
      this.isLoading=false;
      return;
    }

    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    console.log(parsedUser.userName)
    const newOrder: EmergencyOrder = {
      nurseName: parsedUser?.userName ?? '',
      emergencyOrderType: 'Male',
      sendDate: new Date(),
      items: this.items,
    };
    console.log('newOrder',newOrder);
    this.emergencyOrderService.addOrder(newOrder).subscribe({
      next: () => {
        this.isLoading=false;
        this.items = [];
        this.saveItemsToSessionStorage();
        this.resetForm();
        alert('تم حفظ طلب العلاج');
      },
      error: (err) => {
        console.error('Error saving order:', err);
        this.isLoading=false;
        alert('حدث خطأ أثناء حفظ الطلب');
      },
    });
  }
}
