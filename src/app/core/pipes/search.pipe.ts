import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ArrayOfObject:any[] , tirm : string ): any[] {
    return ArrayOfObject.filter( (item) => item.title.toLowerCase().includes(tirm.toLowerCase()) ) ;
  }

}
