import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse, User } from '~/interfaces/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);
  private _apiURL = 'https://randomuser.me/api?results=10&seed=55k';
  private _initialUsers = signal<User[]>([]);
  private _users = signal<User[]>([]);

  constructor() {
    console.log('start users service!!!');
    this.getUsers();
  }

  get users() {
    return this._users.asReadonly();
  }

  private getUsers() {
    this._http.get<APIResponse>(this._apiURL).subscribe((resp) => {
      this._users.set(resp.results);
      this._initialUsers.set(resp.results);
    });
  }

  deleteUser(userUUID: string) {
    const newUsers = this.users().filter(
      (user) => user.login.uuid !== userUUID
    );
    this._users.set(newUsers);
  }

  resetToInitialUsers() {
    this._users.set(this._initialUsers());
  }
}
