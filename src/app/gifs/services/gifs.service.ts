import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList:Gif[]=[]
  private _tagsHistory:string[]=[];
  private api_key:string='VZeqM758tjhNiQjx4mGQXrWcfRQGF4ZQ';
  private serviceUrl:string='https://api.giphy.com/v1/gifs';
  constructor( private http:HttpClient) {
    this.loadLocalStorage();
    console.log("Gifs Service Ready");
   }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !==tag)
    }

    //unshift agrega nuevos elementos al inicio del array
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
                                  //si o si se tiene que castear a string, en este caso el arreglo de string
    localStorage.setItem('History',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('History'))return;

    this._tagsHistory = JSON.parse(localStorage.getItem('History')!);

    if(this._tagsHistory.length === 0)return;
    this.searchTag(this._tagsHistory[0]);
  }


  searchTag(tag:string):void{
    if(tag.length === 0)return;
    this.organizeHistory(tag);

    const params = new HttpParams()
          .set('api_key',this.api_key)
          .set('limit','10')
          .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:params})
        .subscribe(resp =>{
          this.gifList =resp.data;
          // console.log({gif:this.gifList});
        });

  }




}