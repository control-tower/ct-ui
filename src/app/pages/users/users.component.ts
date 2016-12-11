import { UserSelector } from './../../selectors/user';
import { UserAction } from './../../actions/user';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IUser } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[]
  usersFilter: IUser[]
  userSub: Subscription

  private searchUserStream = new Subject<string>()

  constructor(private userAction: UserAction, private userSelector: UserSelector) { }

  ngOnInit() {
    this.userAction.searchUsers();
    this.userSub = this.userSelector.getUsers().do(x => console.log(x)).map((data) => data.map((el) => Object.assign({}, el))).subscribe((data) => {
      this.users = data;
      this.filter('');
    });

    this.searchUserStream
      .debounceTime(300)
      .distinctUntilChanged()      
      .subscribe(term => this.filter(term));
  }

  private filter(term){
    this.usersFilter = this.users.filter(d => {
      if (term) {
        return d.email && d.email.indexOf(term) >= 0;
      }
      return true;
    });
  }

  refresh(){
    this.userAction.searchUsers();
  }

  updateFilter(term) {
    this.searchUserStream.next(term);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  updateRole(user, role) {
    this.userAction.updateUser(user._id, {role: role});
  }

  
}
