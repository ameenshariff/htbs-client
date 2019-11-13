import { Component, OnInit, Injectable } from '@angular/core';
import { PassdataService } from '../passdata.service';
import { Router } from '@angular/router';
import { HtbsService } from '../htbs.service';
import { Customer } from '../model/customerreg';
import { BillGenerate } from '../model/billGen';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  count = 1;

  loggedInAdmin = "";

  searchText

  customers: Customer[] = [];

  customerToBeEdited: Customer;

  todaysDate = new Date().getDate();

  regDate;

  billGen: BillGenerate;

  users = ["Cryptogenic", "document", "Cryptogenic", "Cryptogenic"]
  yep;

  constructor(private dataService: PassdataService, private router: Router, private service: HtbsService) {
    this.billGen = new BillGenerate();
  }

  ngOnInit() {
    (<HTMLDivElement>document.getElementById("navg")).hidden = true
    this.loggedInAdmin = sessionStorage.getItem("adminName");
    this.service.getCustomers().subscribe(data => {

      this.customers = data;
      this.regDate
      console.log(data);
    });

    // for (let i = 0; i < this.customers.length; i++) {
    //   this.service.checkBillForCurrentMonthByUserName(this.billGen.userName).subscribe(data => {
    //     console.log(this.billGen.userName)
    //     console.log(data)

    //     if (data)
    //       (<HTMLButtonElement>document.getElementById("genBill")).hidden = true
    //   })
    // }

  }

  areDateSame(date): boolean {
    if (this.todaysDate.toString() == date.slice(8, 10)) {
      return true
    }
    else
      return false

  }

  generateBill(firstName, lastName, userName) {
    this.billGen.userName = userName;
    localStorage.setItem("custName", this.billGen.userName);
    this.billGen.billGenerateDate = new Date().toISOString().slice(0, 10)

    console.log(this.billGen)
    const confirmation = confirm("Bill will be generated for " + firstName + " " + lastName + ". Are you sure?")
    if (confirmation) {
      this.service.generateBill(this.billGen).subscribe();
      // this.ngOnInit();
    }

    this.service.checkBillForCurrentMonthByUserName(this.billGen.userName).subscribe(data => {
      //     console.log(this.billGen.userName)
      //     console.log(data)
      this.yep=data;
      //     if (data)
      //       (<HTMLButtonElement>document.getElementById("genBill")).hidden = true
        })


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

  // check(userName):boolean{
    
  //   this.service.checkBillForCurrentMonthByUserName(userName).subscribe(data => {
  //     //     console.log(this.billGen.userName)
  //     //     console.log(data)
  //     this.yep=data;
  //     console.log(this.yep)
  //     //     if (data)
  //     //       (<HTMLButtonElement>document.getElementById("genBill")).hidden = true
  //       })

  //   return this.yep;
  // }

}
