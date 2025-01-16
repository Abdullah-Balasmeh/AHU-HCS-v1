import { EmergencyOrderService } from './../../../../services/emergency-order.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EmergencyOrder } from '../../../../interfaces/emergency-order.interface';
import { ManagerOrderDialogComponent } from "../manager-order-dialog/manager-order-dialog.component";
@Component({
  selector: 'app-manager-order-table',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, ManagerOrderDialogComponent],
  templateUrl: './manager-order-table.component.html',
  styleUrl: './manager-order-table.component.css'
})
export class ManagerOrderTableComponent implements OnInit{

@Input() gender:string='Male';
selectedOrder:EmergencyOrder={};
showOrderDialog=false;
private readonly emergencyOrderService=inject(EmergencyOrderService);
isLoading=false;
orders:EmergencyOrder[]=[];

ngOnInit(): void {
  this.loadEmergencyOrder();
}
loadEmergencyOrder()
{
this.isLoading=true;
this.emergencyOrderService.getUnapprovedOrders(this.gender).subscribe({
next:(orders)=>
  {
    console.log('Manager orders',orders)
    this.orders=orders;
    this.isLoading=false;
  },
  error:(er)=>console.error(er),
})
}
closeAll(): void {
  this.showOrderDialog = false;
}
onViewDetails(order :EmergencyOrder){
this.selectedOrder=order;
this.showOrderDialog=true;
}
}
