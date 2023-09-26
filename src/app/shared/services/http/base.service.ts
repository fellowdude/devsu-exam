import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private URL_BACKEND = environment.URL_BACKEND;

  constructor(private httpService: HttpClient) { }

  get(route: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('authorId', '90909090');
    return this.httpService.get(this.URL_BACKEND + route, {... header});
  }

  getParam(route: string, id: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('authorId', '90909090');
    return this.httpService.get(this.URL_BACKEND + route, {... header, params: { id }});
  }

  post(route: string, body: any): Observable<any> {
    let header: HttpHeaders = new HttpHeaders()
      .append('Content-type', 'application/json')
      .append('authorId', '90909090');;
    return this.httpService.post(this.URL_BACKEND + route, body, {... header});
  }

  put(route: string, body: any): Observable<any> {
    let header: HttpHeaders = new HttpHeaders()
      .append('Content-type', 'application/json')
      .append('authorId', '90909090');;
    return this.httpService.put(this.URL_BACKEND + route, body, {... header });
  }

  delete(route: string, id: string): Observable<any> {
    let header: HttpHeaders = new HttpHeaders()
      .append('Content-type', 'application/json')
      .append('authorId', '90909090');
    return this.httpService.delete(this.URL_BACKEND + route, {... header, params: { id: id }});
  }
}
