import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit {

  ngOnInit(): void {
    if(!this.gif)throw new Error('Gif Property is required');
  }

  @Input()
  public gif!:Gif;

}
