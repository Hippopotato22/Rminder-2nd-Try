import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteWarningDialogComponent } from '../delete-warning/delete-warning.component';


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
  private audio: HTMLAudioElement;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>;
  constructor(private dialog: MatDialog) { 
    this.audio = new Audio('assets/Sound/computerwav-14702.mp3');
   }

  alertButtons = ['Action']

  ngOnInit() {}

  onXButtonClick() {
    
    const dialogRef = this.dialog.open(DeleteWarningDialogComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this note?',
      position: {
        top: '50%',
        left: '20%'  
      },
      //panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEvent.emit();
      }
    });
  }


  createNewNoteSound() {
    this.audio.play(); // Play the sound
  }

}
