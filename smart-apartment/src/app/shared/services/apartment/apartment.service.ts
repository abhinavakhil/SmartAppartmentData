import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  endpoint: string = 'https://app.smartapartmentdata.com/';

  constructor(private http: HttpClient) {}

  /**
   * GET APRTMENT LIST ( PROPERTY )
   * @returns APARTMENT LIST AS OBSEVABLE
   */
  apartmentList(): Observable<any> {
    return this.http.get(
      this.endpoint +
        'List/json/listItems.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&receipt=undefined'
    );
  }

  /**
   * GET APARTMENT BY ID
   * @param propertyId PROPERTYID
   * @returns APARTMENT LIST ITEM
   */
  apartmentById(propertyId: number): Observable<any> {
    return this.http.get(
      this.endpoint +
        'List/json/propertyItem.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&propertyID=' +
        propertyId
    );
  }
}
