import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent implements OnInit {
  constructor(private _AuthService:AuthService){}
ngOnInit(): void {
    this.userName = this._AuthService.decodedData.getValue().first_name
}
userName?:string;
logut(){
  this._AuthService.logout()
}
}
