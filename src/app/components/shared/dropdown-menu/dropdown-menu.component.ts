import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-multi-select-dropdown',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class MultiSelectDropdownComponent {
    @Input() options: string[] = [];
    @Input() placeHolder: string = '';
    @Output() selectedChange = new EventEmitter<string[]>();
    @Input() selectedOptions: string[] = [];
    
    @Input() isRole=false;
    customOptions: string[] = [];
    filteredOptions: string[] = [];
    searchTerm: string = '';
    isOpen: boolean = false;

    constructor(private readonly elementRef: ElementRef) {
        this.filteredOptions = [...this.options];
    }

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.filteredOptions = [...this.customOptions, ...this.options];
        }
    }

    toggleOption(option: string): void {
        const index = this.selectedOptions.indexOf(option);
        if (index >= 0) {
            this.selectedOptions.splice(index, 1);
        } else {
            this.selectedOptions.push(option);
        }

        this.selectedChange.emit(this.selectedOptions); // Emit the updated options
    }

    filterOptions(): void {
        const search = this.searchTerm.toLowerCase();
        this.filteredOptions = [...this.customOptions, ...this.options].filter((option) =>
            option.toLowerCase().includes(search)
        );
    }

    addCustomOption(event?: KeyboardEvent): void {
        if (event) {
            event.preventDefault(); // Prevent form submission on Enter
        }
    
        const customOption = this.searchTerm.trim();
        if (customOption && !this.selectedOptions.includes(customOption)) {
            this.selectedOptions.push(customOption); // Add to selected options
            if (!this.options.includes(customOption)) {
                this.options = [customOption, ...this.options]; // Temporarily add to options
            }
        }
        this.searchTerm = ''; // Clear the search term
        this.filterOptions(); // Reapply filtering
        this.selectedChange.emit(this.selectedOptions); // Emit the updated selected options
    }
    
    
    
    

    removeOption(option: string, event: MouseEvent): void {
        event.stopPropagation();
        this.selectedOptions = this.selectedOptions.filter((selected) => selected !== option);

        if (this.customOptions.includes(option)) {
            this.customOptions = this.customOptions.filter((custom) => custom !== option);
        }

        this.filterOptions();
        this.selectedChange.emit(this.selectedOptions); // Emit the updated options
    }
    reset(): void {
        this.selectedOptions = [];
        this.selectedChange.emit(this.selectedOptions);
    }
    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false; // Close dropdown if clicked outside
        }
    }
}
