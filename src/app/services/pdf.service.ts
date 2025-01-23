import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'; // Import fontkit

@Injectable({
  providedIn: 'root',
})
export class PDF {
  constructor() {}

  // Format names to ensure proper Arabic rendering
  formatName(name: string): string {
    return name.replace(/(?!\s)الله/, 'الله');
  }

  // Format time to ensure proper rendering
  formatTime(time: string): string {
    const parts = time.split(':');
    const hours = Number(parts[0]);

    // Remove non-numeric characters from minutes
    let minutesPart = parts[1].trim();
    let minutes = Number(minutesPart.replace(/[^0-9]/g, ''));

    console.log('Parts:', parts, 'Hours:', hours, 'Minutes:', minutes);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time parts:', parts);
      return 'Invalid time';
    }

    // Determine AM/PM explicitly based on input
    const isPM = minutesPart.includes('م');
    const formattedHours = isPM ? (hours % 12 === 0 ? 12 : hours % 12) : hours || 12;
    const period = isPM ? 'م' : 'ص';

    return ` ${period}${this.padZero(formattedHours)}:${this.padZero(minutes)} `;
  }

  // Pad single-digit numbers with a leading zero
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Debug time formatting
  debugAndFormatTime(time: string): string {
    console.log('Raw time input:', time);
    const formattedTime = this.formatTime(time);
    console.log('Formatted time:', formattedTime);
    return formattedTime;
  }

  // Fill the PDF with provided data
  async fillPdf(templateUrl: string, formData: any, type: string): Promise<Blob> {
    // Fetch the template PDF
    const existingPdfBytes = await fetch(templateUrl).then((res) =>
      res.arrayBuffer()
    );

    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Register fontkit for custom fonts
    pdfDoc.registerFontkit(fontkit);

    // Embed Arabic font
    const fontBytes = await fetch('/assets/font/Cairo-VariableFont_slnt,wght.ttf').then((res) =>
      res.arrayBuffer()
    );
    const arabicFont = await pdfDoc.embedFont(fontBytes);

    // Get the form
    const form = pdfDoc.getForm();

    // Function to safely set form fields with RTL handling
    const safeSetField = (fieldName: string, value: string) => {
      const field = form.getTextField(fieldName);
      if (field) {
        console.log(`Setting field "${fieldName}" with value: ${value}`);

        let adjustedValue = value;

        // Reverse the value for RTL fields (e.g., time)
        if (fieldName === 'enterTime' || fieldName === 'leaveTime') {
          adjustedValue = value.split('').reverse().join('');
        }

        field.setText(adjustedValue);
        field.updateAppearances(arabicFont);
      }
    };

    // Handle different document types
    if (type === 'Certificat') {
      safeSetField('id', formData.reportId as string);
      safeSetField('studentName', this.formatName(formData.studentName));
      safeSetField('studentId', formData.studentId as string);
      safeSetField('major', formData.major);
      safeSetField('college', formData.college);
      safeSetField('dose', formData.dose);
      safeSetField('day', formData.day);
      safeSetField('date', formData.date);
      safeSetField('managerName', this.formatName(formData.managerName));
    } else if (type === 'vacIssue') {
      safeSetField('id', formData.id as string);
      safeSetField('studentName', this.formatName(formData.studentName));
      safeSetField('studentId', formData.studentId as string);
      safeSetField('major', formData.major);
      safeSetField('college', formData.college);
      safeSetField('doctorName', this.formatName(formData.doctorName));
      safeSetField('date', formData.date as string);
    } else if (type === 'review') {
      safeSetField('id', formData.reportId as string);
      safeSetField('patientName', this.formatName(formData.patientName));
      safeSetField('patientId', formData.patientId as string);
      safeSetField('day', formData.day);
      safeSetField('enterTime', this.debugAndFormatTime(formData.enterTime));
      safeSetField('leaveTime', this.debugAndFormatTime(formData.leaveTime));
      safeSetField('state', formData.description);
      safeSetField('doctorName', this.formatName(formData.doctorName));
      safeSetField('date', formData.date as string);
    }

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a Blob
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }
}
