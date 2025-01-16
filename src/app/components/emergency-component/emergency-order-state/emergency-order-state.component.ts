import { EmergencyOrder } from '../../../interfaces/emergency-order.interface';
import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EmergencyItemDialogComponent } from "../emergency-item-dialog/emergency-item-dialog.component";

@Component({
  selector: 'app-emergency-order-state',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EmergencyItemDialogComponent],
  templateUrl: './emergency-order-state.component.html',
  styleUrl: './emergency-order-state.component.css'
})
export class EmergencyOrderStateComponent implements OnInit{

private readonly emergencyOrderService=inject(EmergencyOrderService);
@Input() gender=false;
orders:EmergencyOrder[]=[];
selectedOrder:EmergencyOrder={};
showOrderDialog=false;
isLoading=false;
ngOnInit(): void {
  this.loadEmpMaleOrder();
}
loadEmpMaleOrder(){
this.isLoading=true;
this.emergencyOrderService.getOrdersByType(!this.gender? 'Male' : 'Female').subscribe({
  next:(orders)=>{
    this.orders=orders;
    this.isLoading=false;
  },
  error:(er)=>{
    console.error(er);
    this.isLoading=false;
  }
});
}
closeAll(): void {
  this.showOrderDialog = false;

}
onViewDetails(order :EmergencyOrder){
this.selectedOrder=order;
this.showOrderDialog=true;
}
}
