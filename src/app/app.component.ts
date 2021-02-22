import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserData} from './user-data'
import { UserDataService } from "./services/user-data.service";
import {DataOperationsService} from './services/data-operations.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userFormGroup: FormGroup;
  title = 'memory-webapi-demo';
  users;
  userId
  isEdit=false;
  editId;
  formTitle='Create User';

  constructor(private dataOperationsService: DataOperationsService){}

  ngOnInit(){
    this.getUsers();
    this.userFormGroup = new FormGroup(
      {
        id : new FormControl('',Validators.required),
        name : new FormControl('',[Validators.required]),
        age : new FormControl('',Validators.required),
        email : new FormControl('',Validators.required),
        contact : new FormControl('',Validators.required),

      },
    );
  }

  //*Get users from database and display it as list/
  getUsers(){
    this.editId=undefined;

    this.users=[]
    this.dataOperationsService.getUsers().subscribe(data=>{
      console.log(data);
      this.users=data;

    });
  }

  /**
   * Used to get particular user details
   */
  searchUser(){
    this.editId=undefined;

    if(this.userId){
      console.log(this.userId);
      this.dataOperationsService.getUser(this.userId).subscribe(data=>{
        console.log("single user get=",data);
        if(data){
          this.users=[];
          this.users=[data];
        }else{
          this.users=[];
        }
  
      });
    }
  }

  deleteUser(userValue){
    this.editId=undefined;
    this.dataOperationsService.deleteUser(userValue).subscribe(data=>{
      console.log("delete success");
      this.getUsers();
    });
  }

  //*This function is used for adding new user as well as updating an existing user data in database /
  addUser(){
    console.log(this.userFormGroup.value);
    this.formTitle='Create User';

    if(this.isEdit){
      console.log("edit is requried", this.editId) ; 
      this.dataOperationsService.updateUser(this.editId,this.userFormGroup.value).subscribe(data=>{
        console.log("update success",data);
        this.getUsers();
        this.userFormGroup.reset();

      });
    }else{
    this.dataOperationsService.addUser(this.userFormGroup.value).subscribe(data=>{
      console.log("add success",data);
      this.getUsers();
      this.userFormGroup.reset();
    })
  }
  }

  //*Used for getting the details of seected existing user and displaying in the form. We can edit the details and submit the data/
  updateUser(userIdToUpdate){
    console.log(userIdToUpdate);
    this.editId=userIdToUpdate;
    this.formTitle='Update User';
    this.isEdit=true;
    this.dataOperationsService.getUser(userIdToUpdate).subscribe((data:any)=>{
      console.log("single user get=",data);
      this.userFormGroup.patchValue({
        id : data.id,
        name : data.name,
        age : data.age,
        email : data.email,
        contact : data.contact,

      });//patch value end

      
    });//get subscribe end
  }

}


