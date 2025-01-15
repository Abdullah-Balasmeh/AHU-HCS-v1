import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultiSelectDropdownComponent } from "../../shared/dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'app-prescription-dialog',
  standalone: true,
  imports: [MultiSelectDropdownComponent],
  templateUrl: './prescription-dialog.component.html',
  styleUrl: './prescription-dialog.component.css'
})
export class PrescriptionDialogComponent {
  @Input() patientName: string = '';
  @Input() prescription: any | null = null;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}
