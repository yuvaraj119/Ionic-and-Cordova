import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder,FormGroup} from '@angular/forms'

/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder) {
      this.comment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 0,
        comment: ['', Validators.required] 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(){
    console.log(this.comment.value);
    this.viewCtrl.dismiss(this.comment.value);
  }

}
