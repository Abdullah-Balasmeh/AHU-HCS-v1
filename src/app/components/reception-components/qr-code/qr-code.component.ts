import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit, OnDestroy {
  qrImageUrl: string = ''; // Holds the dynamic QR Code URL
  private intervalId: any; // To store the setInterval reference

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
    const baseUrl = 'https://www.youtube.com/'; // Base URL
    const dynamicContent = date.getTime(); // Dynamic part (current timestamp in milliseconds)
    const fullUrl = `${baseUrl}?t=${dynamicContent}`; // Combine URL with dynamic part

    this.qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      fullUrl
    )}`; // Generate the QR code URL
    // console.log('QR Code Updated:', dynamicContent);
  }
}
