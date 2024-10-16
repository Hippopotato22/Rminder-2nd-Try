import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

import { Storage } from '@ionic/storage-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent  implements OnInit {

  note: Note;
  noteId: number;
  new: boolean;
  private audio: HTMLAudioElement;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute, private storage: Storage) {
    this.storage.create();
    this.audio = new Audio('assets/Sound/pop-39222.mp3');
  }

  ngOnInit() {
    
    //we want to find out if we are creating a new note for editing an existing one
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      if (params['id']) {
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    })
    
  }

  async onSubmit(form: NgForm) {
    
    //await this.storage.create();
    if (this.new) {
      //we should save the note
      this.notesService.add(form.value);
      
      
    } else {
      //this.storage.set("notes", form.value.title, form.value.body)
      this.notesService.update(this.noteId, form.value.title, form.value.body);

    }
    
    
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }


  createNewNoteSound() {
    this.audio.play(); // Play the sound
  }
  
}


