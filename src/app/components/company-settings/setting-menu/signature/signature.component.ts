import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.css',
})
export class SignatureComponent {
  addSign: FormGroup;
  selectedSignature: File | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  constructor(private fbs: FormBuilder) {
    this.addSign = this.fbs.group({});
  }
  onChangeFile(event: any) {
    const file = event.target.files[0];
    if (
      (file && file.type === 'image/png') ||
      (file && file.type === 'image/jpg') ||
      (file && file.type === 'image/jpeg')
    ) {
      this.selectedFile = file;
      this.addSign.patchValue({
        comLogo: this.selectedFile,
      });
      this.previewFile(file);
    } else {
      alert('Only PNG files are allowed.');
    }
  }
  clearFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.addSign.patchValue({
      comLogo: null,
    });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files[0];
    if (
      (file && file.type === 'image/png') ||
      (file && file.type === 'image/jpg') ||
      (file && file.type === 'image/jpeg')
    ) {
      this.selectedFile = file;
      this.addSign.patchValue({
        comLogo: this.selectedFile,
      });
      this.previewFile(file);
    } else {
      alert('Only PNG files are allowed.');
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.previewUrl = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}
