import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsSvc:GifsService){}

  get tags() {
    return this.gifsSvc.tagsHistory;
  }

  searchTag(tag:string):void{
    this.gifsSvc.searchTag(tag);
  }

}
