import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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
  constructor() { }

  ngOnInit() {}

  onXButtonClick() {
    this.deleteEvent.emit();
  }

}
