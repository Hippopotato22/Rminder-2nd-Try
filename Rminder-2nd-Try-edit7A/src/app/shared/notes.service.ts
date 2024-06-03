import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { Title } from '@angular/platform-browser';



import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private _storage: Storage| null = null;

  notes: Note[] = new Array<Note>();

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  getALL() {
    return this.notes;
  }

  get(id: number){
    return this.notes[id];
  }

  getId(note: Note){
    return this.notes.indexOf(note);
  }

 async add(note: Note) {
   
    await this.storage.set('noteKey', note);
    //this method will add a note to the notes array and return the id of the note
    // where the id = index
    //await this.storage.set('note', note);
    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index; 

    
  }

  update(id: number, title: string, body: string) {
    
    
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  async delete(id: number) {
    
    this.notes.splice(id, 1);
    
  }

  public set(key: string, value: any, index: number) {
    this._storage?.set(key, value);
  }


}
