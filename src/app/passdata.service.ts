import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassdataService {
  
  private custName=""

  date;
  amount;
  constructor() { }

  
  setdate(billDate: string) {
    this.date=billDate;
  }

  getDate(){
    return this.date;
  }

  setAmount(amount: number) {
    this.amount=amount;
  }

  getAmount(){
    return this.amount;
  }
  

  getCustName(){
    return this.custName;
  }

  setCustName(custName){
    this.custName=custName;
  }
}
