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

export class NotesListComponent implements OnInit {

    notes: Note[] = new Array<Note>();
    filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // we want to retrieve all notes from NotesSerive
    this.notes = this.notesService.getALL();
    this.filteredNotes =  this.notes;
  }


  deleteNote(id: number){
    this.notesService.delete(id);
  }

  filter(query: any) {
    query = query.toLowerCase().trim();
    
    
    let allResults: Note[] = new Array<Note>();
    // split search query into individ. words
    let terms: string[] = query.split(' '); //split on spaces
    //remove duplicate seach terms
    terms = this.removeDuplicates(terms);
    //compile all relevants results into the allResults array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      // append results to the allResutls array
      allResults = [...allResults, ...results]
    });

    // all results will include duplicate notes
    // because a particular note can be the result of many search terms
    //but we dont want to show the same note multiple times on the UI
    // se we first must remove the duplicates
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    // loop through the iunput array & add items to the set
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string) : Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }


}
