import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  employee = {
    name: '',
    surname: '',
    email : '' ,
    position : '',
    gender: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams ,
    private databaseProvider: DatabaseProvider, private viewCtrl: ViewController) {
  }
  createEmployee() {
    this.databaseProvider.addEmployee(this.employee.name, this.employee.surname,this.employee.email,this.employee.position,this.employee.gender).then((data) => {
      this.viewCtrl.dismiss({ reload: true });
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
