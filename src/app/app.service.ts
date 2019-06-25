import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  test() {
    console.log('app');
  }

  getUsers() {
      const options = {
          headers: {
              'mpl-ajax-loader-id': 'GET_USERS'
          }
      };

      return this.httpClient.get('https://jsonplaceholder.typicode.com/users/3', options);
  }
}
