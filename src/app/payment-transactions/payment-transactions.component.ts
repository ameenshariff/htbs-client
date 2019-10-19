import { Component, OnInit } from '@angular/core';
import { HtbsService } from '../htbs.service';
import { Payment } from '../model/payment';
import { PassdataService } from '../passdata.service';

@Component({
  selector: 'app-payment-transactions',
  templateUrl: './payment-transactions.component.html',
  styleUrls: ['./payment-transactions.component.css']
})
export class PaymentTransactionsComponent implements OnInit {

  transactions:Payment[];

  billGenerateDate;


  constructor(private service: HtbsService,private passService:PassdataService) { }

  ngOnInit() {
    this.billGenerateDate=this.passService.getDate();
    this.service.getAllTransactions(sessionStorage.getItem("userName")).subscribe((data)=>{
      console.log(data)
      this.transactions=data;
      if(this.transactions.length==0){
        (<HTMLButtonElement>document.getElementById("print")).hidden=true;
        (<HTMLParagraphElement>document.getElementById("noTrans")).hidden=false;
      }
      console.log(this.transactions.length)
    });


    
  }

  printTransactions(){
    print();
  }

}
