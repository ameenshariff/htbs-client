import { Component, OnInit, Injectable } from '@angular/core';
import { PassdataService } from '../passdata.service';
import { Router } from '@angular/router';
import { HtbsService } from '../htbs.service';
import { Customer } from '../model/customerreg';
import { last } from '@angular/router/src/utils/collection';
import { BillGenerate } from '../model/billGen';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  loggedInAdmin = "";

  searchText

  customers: Customer[] = [];

  customerToBeEdited: Customer;

  todaysDate = new Date().getDate();

  regDate;

  billGen: BillGenerate;

  users = ["Cryptogenic", "document", "Cryptogenic", "Cryptogenic"]

  constructor(private dataService: PassdataService, private router: Router, private service: HtbsService) {
    this.billGen = new BillGenerate();
  }

  ngOnInit() {

    // console.log(customer.propertyRegistrationDate==this.todaysDate);
    (<HTMLDivElement>document.getElementById("navg")).hidden = true
    this.loggedInAdmin = sessionStorage.getItem("adminName");
    // this.service.getUserFullNames()
    this.service.getCustomers().subscribe(data => {

      this.customers = data;
      this.regDate
      console.log(data);
    });
  }

  areDateSame(date: string): boolean {
    // Check if obj is defined to avoid errors.
    if (this.todaysDate.toString() == date.slice(8, 10)) {
      return true
    }
    else
      return false
  }

  generateBill(firstName, lastName, userName) {
    this.billGen.userName = userName;
    this.billGen.billGenerateDate = new Date().toISOString().slice(0, 10)

    // console.log(this.billGen)
    const confirmation = confirm("Bill will be generated for " + firstName + " " + lastName + ". Are you sure?")
    if (confirmation)
      this.service.generateBill(this.billGen).subscribe();


  }

  logout() {
    if (confirm("Are you sure ?")) {
      this.service.logOut();
      this.router.navigate(['/homepage']);
    }
  }

  editCustomer(customer) {
    console.log(customer)
    this.dataService.setcustomerToBeEdited(customer);
    this.router.navigate(['/edit-customer'])
    document.getElementById("editing").hidden = false;
  }

  hide() {
    document.getElementById("editing").hidden = true;
  }

}
