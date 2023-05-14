import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _NoteService: NoteService,
    public dialog: MatDialog,
    private _ToastrService:ToastrService
  ) {}
  notes: any[] = [];
  searchInput: string = '';
  ngOnInit(): void {
    this.getUserNotes();
  }
  AddNote() {
    let MatDialogRef = this.dialog.open(NoteDataComponent);
    MatDialogRef.afterClosed().subscribe({
      next: (response) => {
        if (response == 'done') {
          this.getUserNotes();
        }
      },
    });
  }
  getUserNotes() {
    this._NoteService.getUserNotes().subscribe({
      next: (response) => {
        if(response.message === 'success'){
          this.notes = response.Notes;
        }else if(response.message ==='no notes found'){
          this.notes = []
        }
        console.log(response);
      },
    });
  }
  deleteNote(noteID: string,title:string,index:number) {
    let noteForm: any = {
      body: { NoteID: noteID, token: localStorage.getItem('userToken') },
    };

    this._NoteService.deleteNote(noteForm).subscribe({
      next: (response) => {
        if(response.message === 'deleted'){
          console.log(response);
          // this.getUserNotes()
          this.notes.splice(index,1)
          this.notes = [...this.notes]
          this._ToastrService.success(`<strong>Done! <i class="fa-solid fa-thumbs-up fa-bounce"></i></strong><br>'${title}' was deleted successfully.`,undefined,{enableHtml:true})
        }
      },
    });
  }
  setData(note:object):void{
  let openEdit = this.dialog.open(NoteDataComponent,{data:{note}})
  openEdit.afterClosed().subscribe({
    next: (response) => {
      if (response == 'done') {
        this.getUserNotes();
      }
    },
  });
  }
}
