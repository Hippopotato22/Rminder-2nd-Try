import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.scss'],
})
export class DeleteWarningDialogComponent  implements OnInit {

  
  constructor(

    
    public dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {}

  
}
