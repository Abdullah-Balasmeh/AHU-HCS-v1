import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'; // Import fontkit

@Injectable({
  providedIn: 'root',
})
export class PDF {
  constructor() {}

  async fillPdf(templateUrl: string, formData: any , type:string): Promise<Blob> {
    // Fetch the template PDF
    const existingPdfBytes = await fetch(templateUrl).then((res) =>
      res.arrayBuffer()
    );

    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch('/assets/font/Cairo-VariableFont_slnt,wght.ttf').then((res) =>
      res.arrayBuffer()
    );
    const arabicFont = await pdfDoc.embedFont(fontBytes);

    // Get the form
    const form = pdfDoc.getForm();

    // Function to handle RTL Arabic text
    const safeSetField = (fieldName: string, value: string) => {
      const field = form.getTextField(fieldName);
      if (field) {
        field.setText(value);
        field.updateAppearances(arabicFont);
      } else {
        console.warn(`Field ${fieldName} not found in the PDF.`);
      }
    };
    if(type=='Certificat')
  {
    safeSetField('id', formData.id as string);
    safeSetField('studentName', formData.studentName);
    safeSetField('studentId', formData.studentId);
    safeSetField('major', formData.major);
    safeSetField('college', formData.college);
    safeSetField('dose', formData.dose);
    safeSetField('day', formData.day);
    safeSetField('date', formData.date);
    safeSetField('managerName', formData.managerName);
  }else if(type=='vacIssue')
  {
    safeSetField('id', formData.id as string);
    safeSetField('studentName', formData.studentName);
    safeSetField('studentId', formData.studentId);
    safeSetField('major', formData.major);
    safeSetField('college', formData.college);
    safeSetField('date', formData.date);
  }


    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a Blob
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }
}
