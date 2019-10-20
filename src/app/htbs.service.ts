import { Injectable } from '@angular/core';
import { Login } from './model/login';
import { Customer } from './model/customerreg';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from './model/payment';
import { MainPageComponent } from './main-page/main-page.component';
import { BillGenerate } from './model/billGen';

@Injectable({
  providedIn: 'root'
})
export class HtbsService {
  
  
  
 
  
  private baseUrl = 'http://localhost:8080';



  constructor(private http: HttpClient) { 
  }

  refresh(){
    
  }

  loginDetails(login: Login) {
    return this.http.post(`${this.baseUrl}` + `/loginDetails/`, login);

  }
  registerCustomer(registration: Customer) {
    console.log(registration);
    return this.http.post(`${this.baseUrl}` + `/registerCustomer/`, registration);
  }

  validateLogin(login: Login) {
    // return this.http.get(`${this.baseUrl}`+`/validateLogin/`,loginw);
    return this.http.get(`${this.baseUrl}/validateLogin/${login.userName}/${login.password}`);
  }

  validateAdmin(login: Login) {
    return this.http.get(`${this.baseUrl}/validateAdminLogin/${login.userName}/${login.password}`);
  }

  logOut() {
    sessionStorage.removeItem("adminName");
    sessionStorage.removeItem("userName");
  }

  getLoggedInCustomer(loggedInCustomer: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCustomerDetails/${loggedInCustomer}`);
  }

  getBillDetails(loggedInCustomer: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBills/${loggedInCustomer}`);
  }

  savePaymentDetails(payment: Payment) {
    return this.http.post(`${this.baseUrl}` + `/savePaymentDetails/`, payment);
  }

  getAllTransactions(loggedInCustomer:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllTransactions/${loggedInCustomer}`);
  }

  isUser(userName: string) {
    return this.http.get(`${this.baseUrl}/isUser/${userName}`);
  }

  getCustomers() : Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllCustomers`);
  }

  getFine(billNo: number, billPayDate: string) {
    return this.http.get(`${this.baseUrl}/calculateFine/${billNo}/${billPayDate}`);
  }

  generateBill(billGen:BillGenerate) {
    console.log(billGen)
    return this.http.post(`${this.baseUrl}/generateBill/`,billGen);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(`${this.baseUrl}/updateEditedCustomers/`,customer);
  }

}
