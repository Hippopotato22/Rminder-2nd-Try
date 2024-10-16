import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.scss'],
})
export class DeleteWarningDialogComponent  implements OnInit {

  private audio: HTMLAudioElement;
  
  constructor(
    
    
    
    public dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {

    this.audio = new Audio('assets/Sound/pop-39222.mp3');

   }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
    this.audio.play();
  }

  ngOnInit() {}

  
}