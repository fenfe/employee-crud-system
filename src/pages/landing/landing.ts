import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { EmployeePage } from '../employee/employee';
import { ToastController } from 'ionic-angular';
FormGroup
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formgroup: FormGroup;
 
 usernamel: AbstractControl;
 usernamer: AbstractControl;
 emailr: AbstractControl;
 passwordl: AbstractControl;
 passwordr: AbstractControl;
 confirmPasswordr: AbstractControl;

register = {
  rUsername: '',
  rEmail: '',
  rPassword: '',
}

login = {
  lUsername: '',
  lPassword: ''
}

  constructor(public navCtrl: NavController, private database: DatabaseProvider, public formbuilder: FormBuilder, public toastCtrl: ToastController ) {
    this.formgroup = formbuilder.group({
      usernamel:['', Validators.required],
      usernamer:['', Validators.required],
      emailr:['', Validators.required],
      passwordl:['', Validators.required, Validators.min[6], Validators.max[10]],
      passwordr:['', Validators.required, Validators.min[6], Validators.max[10]],
      confirmPasswordr:['', Validators.required]
  });
  
      this.usernamel = this.formgroup.controls['usernamel'];
      this.usernamer = this.formgroup.controls['usernamer'];
      this.emailr = this.formgroup.controls['emailr'];
      this.passwordl = this.formgroup.controls['passwordl'];
      this.passwordr = this.formgroup.controls['passwordr'];
      this.confirmPasswordr = this.formgroup.controls['confirmPasswordr'];
  }
 


  createUsers() {
    
    this.database.createUser(this.register.rUsername, this.register.rEmail, this.register.rPassword).then((data) => {
      /* this.viewCtrl.dismiss({ reload: true }); */
      this.successToast('top', 'you have been added successfully');

    })
  }


  loginFunction() {
    
    this.database.login(this.login.lUsername, this.login.lPassword).then((success) => {
      if(success == null) {
        this.warningToast('top', 'username/password is not correct');
      }else {
        this.successToast('top', 'Username and password was correct. you will be redirected to the next page');
        console.log(success.id);
        
        this.next();
      }
      
    })
  }
 
 

  next() {
    this.navCtrl.push(EmployeePage);
  }

  successToast(postion, message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: postion,
    });
    toast.present();
  }

  warningToast(position, error) {
    const toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: position
    });
    toast.present();
  }

}
