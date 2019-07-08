import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Emp, DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  employee : Emp = null;
  empID :any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.empID = this.navParams.data ;
    this.loadEmp(this.empID);
    console.log(this.empID);
  }

  ionViewDidLoad() {
  
  }
  loadEmp(id) {
    this.databaseProvider.getEmployeeInfoById(id).then((res) => {
      console.log(res);
      
      this.employee = res;
    })
  }

}
