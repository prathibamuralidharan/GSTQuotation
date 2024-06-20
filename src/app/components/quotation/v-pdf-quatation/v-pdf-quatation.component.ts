import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-pdf-quatation',
  templateUrl: './v-pdf-quatation.component.html',
  styleUrl: './v-pdf-quatation.component.css',
})
export class VPdfQuatationComponent implements OnInit {
  @Input() quoId: any; // Input property to receive quoId from parent component
  @Input() isPopupVisible: boolean = false;

  isfadeOutDown = false;
  ispdfview = false;

  ngOnInit() {
    console.log('Received PDF data:', this.quoId);
    // Implement any logic related to quoId if necessary
  }

  hidePopup() {
    this.isfadeOutDown = true;
    setTimeout(() => {
      this.isPopupVisible = false;
      this.isfadeOutDown = false;
    }, 500); // Adjust the duration to match the animation duration
  }

  // Function to download the quotation as a PDF
  downloadQuotation(): void {
    const element = document.getElementById('popup-wrapper');
    if (element) {
      const opt: any = {
        margin: 1,
        filename: 'quotation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      // @ts-ignore
      html2pdf().from(element).set(opt).save();
    } else {
      console.error('Element not found');
    }
  }
}
