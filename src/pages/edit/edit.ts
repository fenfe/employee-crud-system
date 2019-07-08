import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider, Emp } from '../../providers/database/database';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  employee : Emp = null;
  employeeID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private databaseProvider: DatabaseProvider,public toastCtrl: ToastController, private viewCtrl: ViewController) {
    this.employeeID = this.navParams.data;
    this.loadEmployee(this.employeeID);
    console.log('employee id ='+this.employeeID)
  }
  ionViewDidEnter() {
   
    
  }
  loadEmployee(id) {
    this.databaseProvider.getEmployeeInfoById(id).then((res) => {
      console.log(res);
      
      this.employee = res;
    })
  }
  update(){
    this.databaseProvider.updateEmployee(this.employee).then(async (res) => {
      let toast = await this.toastCtrl.create({
        message: 'Student updated',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss({ reload: true });
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
