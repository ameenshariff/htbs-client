import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customerreg';
import { Login } from '../model/login';
import { HtbsService } from '../htbs.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: Customer;
  login: Login;

  isUserNameRegistered;

  constructor(private service: HtbsService) {
    this.isUserNameRegistered = true;
    this.registration = new Customer();
    this.login = new Login();
  }

  ngOnInit() {
    (<HTMLDivElement>document.getElementById("navg")).hidden=true
  }

  user(){
    (<HTMLLabelElement>document.getElementById("sameId")).hidden = true;
  }

  onRegister() {
    this.registration.userName = this.login.userName;
    this.service.registerCustomer(this.registration).subscribe((data) => {
      this.isUserNameRegistered = data;
      console.log(data)

      if (this.isUserNameRegistered == false) {
        (<HTMLLabelElement>document.getElementById("sameId")).hidden = true;
        this.service.loginDetails(this.login).subscribe();
        alert("Registration Succesfull")
        console.log(this.registration);
      }
      else {
        (<HTMLLabelElement>document.getElementById("sameId")).hidden = false;
      }
    });
    


  }

}
