import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `<h5>Buscar:</h5>
              <input type="text"
               class="form-control"
               (keyup.enter)="searchTag()"
               #txtTagInput
               placeholder="Buscar gifs...">`,
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsSvc:GifsService){}


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsSvc.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }

}
