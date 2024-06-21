import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],  // corrected to styleUrls
})
export class SignatureComponent {
 
  addSign: FormGroup;
  successToster: boolean = false;
  message: string = '';
  selectedSignature: File | null = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fbs: FormBuilder, private comService: CompanyService) {
    this.addSign = this.fbs.group({
      comId:[],
      comSignature: [],
    });
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
        comSignature: this.selectedFile,
      });
      console.log(this.selectedFile);
      console.log(this.addSign);
      
      
      this.previewFile(file);
      this.onSubmit();
    } else {
      alert('Only PNG files are allowed.');
    }
  }
  clearFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.addSign.patchValue({
      comSignature: null,
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
        comSignature: this.selectedFile,
      });
      this.previewFile(file);
    } else {
      alert('Only PNG files are allowed.');
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    console.log(file);
    
    reader.onload = (e) => {
      if (e.target?.result) {
        this.previewUrl = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.addSign.valid && this.selectedFile) {
      const formData = new FormData();
      console.log(formData);
      
      formData.append('comSignature', this.selectedFile);

      this.comService.uploadSignature(formData).subscribe(
        (response) => {
          console.log('Upload successful', response);
          
        },
        (error) => {
          if(error.status==200){
           this.successToster=true;
          this.message='Signature upload Successfully'
          }else{
          console.error('Upload error', error);
          }
        },
      );
    }
  }

}

