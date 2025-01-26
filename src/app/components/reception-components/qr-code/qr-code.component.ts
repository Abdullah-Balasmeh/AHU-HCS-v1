import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingImageComponent } from "../../shared/loading-image/loading-image.component";

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [LoadingImageComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit, OnDestroy {
  qrImageUrl: string = ''; // Holds the dynamic QR Code URL
  private intervalId: any; // To store the setInterval reference
  isLoading=true;

  ngOnInit(): void {
    this.updateQRCode(); // Generate QR Code on load
    this.intervalId = setInterval(() => this.updateQRCode(), 10000); // Update QR Code every 10 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval on component destruction
    }
  }

  private updateQRCode(): void {
    const date = new Date();
    const baseUrl = 'https://www.ahu.edu.jo/'; // Base URL
    const dynamicContent = date.getTime(); // Dynamic part (current timestamp in milliseconds)
    const fullUrl = `${baseUrl}?t=${dynamicContent}`; // Combine URL with dynamic part

    this.qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      fullUrl
    )}`; 
    this.isLoading=false;
  }
}
