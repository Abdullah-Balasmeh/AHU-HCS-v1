import { EmergencyOrderService } from './../../../services/emergency-order.service';
import { Component, inject, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";
import { CommonModule } from '@angular/common';
import { EmergencyOrder } from '../../../interfaces/emergency-order.interface';
import { EmergencyItemDialogComponent } from "../../emergency-component/emergency-item-dialog/emergency-item-dialog.component";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pharmacy-order',
  standalone: true,
  imports: [LoadingImageComponent, CommonModule, EmergencyItemDialogComponent],
  templateUrl: './pharmacy-order.component.html',
  styleUrl: './pharmacy-order.component.css'
})
export class PharmacyOrderComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
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
    this.emergencyOrderService.getApprovedOrders().pipe(takeUntil(this.destroy$)).subscribe({
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
