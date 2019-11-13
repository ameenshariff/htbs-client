import { Injectable } from '@angular/core';
import { Login } from './model/login';
import { Customer } from './model/customerreg';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Payment } from './model/payment';
import { MainPageComponent } from './main-page/main-page.component';
import { BillGenerate } from './model/billGen';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HtbsService {
  checkBillForCurrentMonthByUserName(userName: any) {
    return this.http.get(`${this.baseUrl}/checkBillForCurrentMonthByUserName/${userName}`);
  }
  
  private baseUrl = 'http://localhost:8080';



  constructor(private http: HttpClient) { 
  }

  refresh(){
    
  }

  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

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

  // isUser(userName: string) {
  //   return this.http.get(`${this.baseUrl}/isUser/${userName}`).pipe(
  //     retry(1),catchError(this.handleError)
  //   );
  // }

  isUser(userName: string) {
    return this.http.get(`${this.baseUrl}/isUser/${userName}`).pipe(
      retry(1),catchError((error: HttpErrorResponse)=>{
        let errorMessage = '';
         if (error.error instanceof ErrorEvent) {
           // client-side error
           errorMessage = `Error: ${error.error.message}`;
         } else {
           // server-side error
           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
         }
         window.alert(errorMessage);
         return throwError(errorMessage);
      })
    );
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
