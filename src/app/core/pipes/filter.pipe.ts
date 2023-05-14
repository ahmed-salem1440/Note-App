import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes:any[],searchInput:string): any[] {
    let result =notes.filter((element)=> element.title.toLowerCase().includes(searchInput.toLowerCase())); 
    return notes.filter((element)=> element.title.toLowerCase().includes(searchInput.toLowerCase()));
  }


}
