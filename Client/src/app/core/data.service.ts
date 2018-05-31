import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder, IState, IPagedResults, ICustomerResponse } from '../shared/interfaces';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;
    baseCustomersUrl = this.baseUrl + 'customers';
    baseStatesUrl = this.baseUrl + 'states'

    constructor(private http: HttpClient) { }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseCustomersUrl)
            .pipe(
                   map(customers => {
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   }),
                   catchError(this.handleError)
                );
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(`${this.baseCustomersUrl}/page/${page}/${pageSize}`, {observe: 'response'})
            .pipe(            
                map((res) => {
                    //Need to observe response in order to get to this header (see {observe: 'response'} above)
                    const totalRecords = +res.headers.get('x-inlinecount');
                    let customers = res.body as ICustomer[];
                    this.calculateCustomersOrderTotal(customers);
                    return {
                        results: customers,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get<ICustomer>(this.baseCustomersUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post<ICustomerResponse>(this.baseCustomersUrl, customer)
            .pipe(                   
                map((data) => {
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   }),
                catchError(this.handleError)
            );
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put<ICustomerResponse>(this.baseCustomersUrl + '/' + customer.id, customer) 
            .pipe(
                map((data) => {
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   }),
                catchError(this.handleError)
            );
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseCustomersUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }
   
    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.baseStatesUrl)
            .pipe(
                catchError(this.handleError)
            )

    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'ASP.NET Core server error');
    }

}
