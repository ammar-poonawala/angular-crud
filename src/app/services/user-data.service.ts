//import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {UserData} from '../user-data'

// @Injectable({
//   providedIn: 'root'
// })
export class UserDataService implements InMemoryDbService {

  //constructor() { }

  /**Actual data base(file) where we are storing the temporary data. This data will be used to perform variou operations */
 createDb(){
   const users: UserData[]=[
    { id: 1, name: 'Ram', age:25, email: 'ram@gmail.com', contact: '0000000000'  },
    { id: 2, name: 'Shyam',age:27, email: 'sh@gmail.com', contact: '1111111111'  },
    { id: 3, name: 'Mohan',age:30, email: 'moh@live.in', contact: '2222222222'  },
    { id: 4, name: 'Rohan',age:40, email: 'rohan@gmail.com', contact: '6666666666' },
    { id: 5, name: 'Sumit',age:45, email: 'sumit@live.in', contact: '9909999999'  }
   ];
   return {users};
 }

}
