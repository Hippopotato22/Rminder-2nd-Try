import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteWarningDialogComponent } from 'src/app/delete-warning-dialog/delete-warning-dialog.component';



@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent  implements OnInit {

@ViewChild('truncator') truncator: ElementRef<HTMLElement>;

// (!) symbols is for initialing title & body

  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>;
  constructor(private dialog: MatDialog) { }

  alertButtons = ['Action']

  ngOnInit() {}

  onXButtonClick() {
    const dialogRef = this.dialog.open(DeleteWarningDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this note?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit();
      }
    });
  }
}
