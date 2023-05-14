import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
constructor(private _Router:Router){
_Router.events.subscribe({
  next:(response)=>{
    if(response instanceof NavigationStart){
      let path = response.url.replace('/','')
      this.currentPath = path.charAt(0).toUpperCase() + path.slice(1)
    }
  }
})
}
  currentPath:string = 'Login'

}
