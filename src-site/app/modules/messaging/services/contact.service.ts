import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContactService {
  message: object;

  constructor(private http: HttpClient) {}

  sendEmail(message) {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.host}/users/contact-us`, message, { headers });
  }
}
