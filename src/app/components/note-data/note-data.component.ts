import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit {
constructor(private _FormBuilder:FormBuilder,private _NoteService:NoteService,private _MatDialogRef:MatDialogRef<NoteDataComponent>,private _ToastrService:ToastrService,@Inject(MAT_DIALOG_DATA) public data:any){}
dataForm!:FormGroup;
userData:any;
ngOnInit(): void {
  console.log(this.data);
  this.createForm()
  this.userData = jwtDecode(localStorage.getItem('userToken')!)
}
createForm(){
  this.dataForm = this._FormBuilder.group({
    title:[this.data? this.data.note.title:'' ,[Validators.required]],
    desc:[this.data? this.data.note.desc:'',[Validators.required]],
    token:localStorage.getItem('userToken')
  })
}
sendData(form:any){
  console.log(form.value);
}
addNote(form:any){
  if(this.data){
    this.updateNote(form)
  }else{
    let modifiedData:any = {
      ...form.value,
      citizenID:this.userData._id
    }
    
    this._NoteService.addNote(modifiedData).subscribe({
      
      next:(response)=>{
        if(response.message == "success"){
          this._ToastrService.success(`${modifiedData.title} Added successfully  <i class="fa-solid fa-heart fa-bounce"></i>`,'Done!',{enableHtml:true})
          this._MatDialogRef.close('done')
        }      
     
      }
    })
  }
}
updateNote(form:FormGroup):void{
  let newNote = {
    ...form.value,
    NoteID:this.data.note._id
  }
  this._NoteService.updateNote(newNote).subscribe({
    next:(response)=>{

      console.log(response);
        if(response.message == 'updated'){
          this._ToastrService.success(`${form.value.title} Updated successfully  <i class="fa-solid fa-heart fa-bounce"></i>`,'Done!',{enableHtml:true})
          this._MatDialogRef.close('done')
        } 
    }
  })
}
}
