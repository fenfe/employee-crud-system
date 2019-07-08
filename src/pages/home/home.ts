import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, ViewController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { EditPage } from '../edit/edit';
import { ViewPage } from '../view/view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Employees = [];
  isHidden:Boolean = true;
 
  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider, 
    private modelCtrl: ModalController, private toastCtrl: ToastController, private viewCtrl: ViewController,public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.databaseProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadEmployees();
      }
    })
  }

  loadEmployees() {
    this.databaseProvider.getAllEmployees().then((res) => {
      this.Employees = res;
    })
  }

  addEmployee() {
   
    let modal = this.modelCtrl.create("AddPage")
    modal.onDidDismiss((data) => {
      if(data && data.reload) {
        const toast = this.toastCtrl.create({
          message: 'New Student Added!',
          duration: 2000
        })
        this.loadEmployees();
      }
    });
    modal.present();
  }
  showFilter(){
    this.isHidden = !this.isHidden;
  }
  delete(id){
    if(confirm('Are you sure you want to delete this employee')) {
      this.databaseProvider.delete_byID(id).then((response) => {
         this.warningToast('middle', 'Successfully deleted an employee');
         this.loadEmployees();
         
       })
     }
  }
  editEmployee(id){

    this.navCtrl.push(EditPage, id);
    console.log('The is = ', id);
    

  }
  viewEmp(id){
    this.navCtrl.push(ViewPage, id);
    console.log('The is = ', id);
  }


  warningToast(position, message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });
    toast.present();
  }
  getItems(){
    this.Employees
    console.log();
  }
}
