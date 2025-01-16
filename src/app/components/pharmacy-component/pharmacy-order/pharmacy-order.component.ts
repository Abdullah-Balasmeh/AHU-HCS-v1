import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { Component, inject, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EmergencyOrder } from '../../../interfaces/emergency-order.interface';
import { EmergencyItemDialogComponent } from "../../emergency-component/emergency-item-dialog/emergency-item-dialog.component";

@Component({
  selector: 'app-pharmacy-order',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EmergencyItemDialogComponent],
  templateUrl: './pharmacy-order.component.html',
  styleUrl: './pharmacy-order.component.css'
})
export class PharmacyOrderComponent implements OnInit {
  selectedOrder:EmergencyOrder={};
  showOrderDialog=false;
  isPharmacy=true;
  ngOnInit(): void {
    this.loadEmrOrders();
  }
  private readonly emergencyOrderService=inject(EmergencyOrderService);
  isLoading=false;

  orders:EmergencyOrder[]=[];

  loadEmrOrders(){
    this.isLoading=true;
    this.emergencyOrderService.getApprovedOrders().subscribe({
      next:(orders)=>{
        this.orders=orders;
        this.isLoading=false;
      }
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
