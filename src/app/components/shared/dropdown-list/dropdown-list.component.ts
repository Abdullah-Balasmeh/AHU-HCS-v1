import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'app-dropdown-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent {
    @Input() options: string[] = [];
    @Input() placeHolder: string = '';
    @Input() selectedOptions: string = ''; // Single selection
    @Output() selectedChange = new EventEmitter<string>();

    isOpen: boolean = false;

    constructor(private readonly elementRef: ElementRef) { }

    // Toggles the dropdown visibility
    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }

    // Selects a single option
    toggleOption(option: string): void {
        this.selectedOptions = option; // Set the single selected option
        this.selectedChange.emit(option); // Emit the selected option
        this.isOpen = false; // Close dropdown after selection
    }

    // Getter for displaying the selected option or placeholder
    get selectedOption(): string {
        return this.selectedOptions ? this.selectedOptions : "إختر " + this.placeHolder;
    }

    // Close the dropdown when clicking outside
    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false; // Close dropdown if clicked outside
        }
    }
}
