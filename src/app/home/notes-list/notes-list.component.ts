import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //entry animation
      transition('void => *', [
        //initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
              
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': '0',
        }),
        // animate the spacing (includes height and margin)
        animate('50ms', style({
          height: '*',
         // 'margin-botom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
          
        })),
        animate(100)
      ]),
      transition('* => void', [
        //first scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        //then scale down to normal size while beginning to fade out
        animate(50, style({
          transform: "scale(1)",
          opacity: 0.75
        })),
        //scale down and fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        //animate the spacing (includes height, padding, margin
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 50,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': '0',
          }))
        ])
      ]),

      trigger('listAnim', [
        transition('* => *', [
          query(':enter', [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [
              animate('0.2s ease')
            ])
          ], {
            optional: true
          })
        ])
      ])
    ]
  })  

export class NotesListComponent  implements OnInit {

    notes: Note[] = new Array<Note>();
  

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // we want to retrieve all notes from NotesSerive
    this.notes = this.notesService.getALL();
  }

  deleteNote(id: number){
    this.notesService.delete(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    // split up the search query into indiviual words
    let terms: string[] = query.split(' '); // split on spaces
    //remove duplicate search terms
    terms = this.removeDuplicate(terms);
    //compile all relevant results into the allResults array
  }

  removeDuplicate(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    //loop through the input array and add the items to the set
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: any) {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
  }

}
