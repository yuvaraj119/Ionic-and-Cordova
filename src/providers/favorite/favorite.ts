import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites=[];
  }

  addFavorite(id: number){
    this.favorites.push(id);
    return true;
  }

  isFavorite(id : number): boolean{
    return this.favorites.some(el => el === id);
  }

}
