import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Dish } from './../../shared/dish';
import { DishProvider } from './../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications'
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage,
    private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites=[];

    storage.get('favorites').then(favorites => {
      if(favorites){
        console.log(favorites);
        this.favorites = favorites;
      }else{
        console.log('favorites not defined');
      }
    });

  }

  addFavorite(id: number){
    if(!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set('favorites',this.favorites);

      this.localNotifications.schedule({
        id: 1,
        text: 'Dish '+id+' added as a favorite successfully'
      });
    }
    console.log('favorites',this.favorites);
    return true;
  }

  isFavorite(id : number): boolean{
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]>{
    this.localNotifications.schedule({
      id: 1,
      text: 'Dish added as a favorite successfully',
      icon: 'ic_notifications',
      smallIcon: 'ic_notifications_small'
    });
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]>{
    let index = this.favorites.indexOf(id);
    if(index>=0){
      this.favorites.splice(index,1);
      return this.getFavorites();
    }else{
      console.log('Deleting non-existant favorite',id);
      return Observable.throw('Deleting non-existant favorite'+id);
    }
  }

}
