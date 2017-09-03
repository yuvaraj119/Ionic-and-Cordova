import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from './../../shared/dish';
import { Comment } from './../../shared/comment';
import { FavoriteProvider } from './../../providers/favorite/favorite';

import { CommentPage } from './../comment/comment';


/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish:Dish;
  errMess:string;
  avgstars:string;
  numcomments:number;
  favorite : boolean =false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController, 
    @Inject('BaseURL') public BaseURL,
    private favoriteservice : FavoriteProvider) {
      this.dish = navParams.get('dish');
      this.favorite = this.favoriteservice.isFavorite(this.dish.id)
      this.numcomments=this.dish.comments.length;

      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating);
      this.avgstars = (total/this.numcomments).toFixed(2);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites(){
    console.log('Adding to Favorites', this.dish.id);
    this.favorite=this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish '+this.dish.id+' added as a favorite sucessfully',
      duration: 300
    }).present();
  }

  presentActionSheet(){
    let actionSheet= this.actionsheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text:'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text:'Add to Comment',
          handler: () => {
            this.openComment();
          }
        },
        {
          text:'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openComment(){
    let commentModal = this.modalCtrl.create(CommentPage);
    commentModal.onDidDismiss(data => {
      console.log(data);
      this.dish.comments.push(data);
    });
    commentModal.present();
  }

}
