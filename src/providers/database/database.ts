
import { Injectable } from '@angular/core';
 import { SQLite , SQLiteObject} from '../../../node_modules/@ionic-native/sqlite';
import{ BehaviorSubject} from 'rxjs/Rx';
import { Platform } from '../../../node_modules/ionic-angular';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Emp {
  id: number,
  name: string,
 surname: string,
 email : string ,
 position : string,
 gender: string
}
@Injectable()
export class DatabaseProvider {

  private db:  SQLiteObject;
  private dbisOpen:BehaviorSubject <boolean>; 
  employees = new BehaviorSubject([]);

  constructor(  private sqlite: SQLite, private plt: Platform ) {
    
    this.dbisOpen = new BehaviorSubject(false); //construct
    this.plt.ready().then(() => {
      this.openOrCreate(); 
    }) 
  }        
  
   //method to check the state of my database
  getDatabaseState(){
    return this.dbisOpen.asObservable();
  }

  openOrCreate() {
    console.log('Open/Create DB')
    return this.sqlite.create({
      name: 'employee.db',
      location: 'default',

    }).then((db: SQLiteObject) => {
      this.db = db;
      return this.db.sqlBatch([
 
       
        'CREATE TABLE IF NOT EXISTS employee(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32),surname VARCHAR(32),email VARCHAR(32),position VARCHAR(32),gender VARCHAR(10))'
      ]).then((data) => {
        console.log('After Batch')
        this.dbisOpen.next(true);
        return data;
      });
    })
  }/* end of creating and opening database */

  //method to add user
  addEmployee(name, surname,email,position,gender,){
    return this.db.executeSql('INSERT INTO employee (name,surname,email,position,gender ) VALUES (?,?,?,?,?)', [name, surname,email,position,gender]);
  }

  //method to DISPLAY ALL USERS FROM THE DATABASE
  getAllEmployees(){
    return this.db.executeSql('SELECT * FROM employee', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name: data.rows.item(i).name, id: data.rows.item(i).id, surname: data.rows.item(i).surname,email: data.rows.item(i).email,position: data.rows.item(i).position,gender: data.rows.item(i).gender})
      }
      return results;
    });
  }
  //method to update employee

updateEmployee(emp: Emp){
  let data = [emp.name,emp.email,emp.gender,emp.position,emp.surname];
  return this.db.executeSql(`UPDATE employee SET name = ?,  email = ?, gender = ?, position = ?, surname = ? WHERE id = ${emp.id}`, data).then((data) =>{
    this.loadEmployees();
  })
}

//method to get employee by their Id
getEmployeeInfoById(id): Promise<Emp> {

  return  this.db.executeSql('SELECT * FROM employee WHERE id=?',[id]).then(data => {
   
    return {
      id: data.rows.item(0).id,
      name: data.rows.item(0).name, 
      surname: data.rows.item(0).surname,
      email: data.rows.item(0).email,
      position: data.rows.item(0).position,
      gender: data.rows.item(0).gender,
     
      
    }
  });
  }

  //method to delete employee by Id
  delete_byID(id){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("DELETE FROM employee WHERE id=? ",[id])
  .then(res=>resolve(res))
  .catch(err=>reject(err));
    })
  }

//method used to load employees
loadEmployees() {
  return this.db.executeSql('SELECT * FROM employee', []).then(data => {
    let employees: Emp [] = [];

    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
       

        employees.push({ 
          id: data.rows.item(i).id,
          name: data.rows.item(i).name, 
          surname: data.rows.item(i).surname,
       
          email: data.rows.item(i).email,
          position: data.rows.item(i).position,
          gender: data.rows.item(i).gender
         
         });
      }
    }
    this.employees.next(employees);
  });
}

  } 