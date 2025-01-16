import { Component } from '@angular/core';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-report-section',
  standalone: true,
  imports: [],
  templateUrl: './report-section.component.html',
  styleUrl: './report-section.component.css'
})
export class ReportSectionComponent {
  reports: any[] = [];
  selectedReport: any = null;

  constructor(private readonly reportService: ReportService) {}

  // Fetch all reports
  fetchReports() {
    this.reportService.getReports().subscribe((data) => {
      this.reports = data;
    });
  }

  // Generate and download a report
  generateReport() {
    const reportData = {
      reportType: 'إجازة مرضية',
      description: 'Example Description',
      disease: 'Example Disease',
      patientId: '12345',
      userId: '67890',
      date: new Date(),
    };

    this.reportService.generateReport(reportData).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportData.reportType}_Report.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
