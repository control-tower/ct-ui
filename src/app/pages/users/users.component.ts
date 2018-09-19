import { UserSelector } from './../../selectors/user';
import { UserAction } from './../../actions/user';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IUser } from './../../models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUser[]
  usersFilter: IUser[]
  userSub: Subscription
  filterText: string = ''
  @ViewChild('createUserModal') createUserModal

  registerUserForm: FormGroup

  private searchUserStream = new Subject<string>()

  constructor(private userAction: UserAction, private userSelector: UserSelector, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userAction.searchUsers();
    this.userSub = this.userSelector.getUsers().map((data) => data.map((el) => Object.assign({}, el))).subscribe((data) => {
      this.users = data;
      this.filter(this.filterText);
    });

    this.searchUserStream
      .debounceTime(300)
      .distinctUntilChanged()
      .map(term => this.filterText = term)
      .subscribe(term => this.filter(term));

    this.registerUserForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'role': ['', Validators.compose([Validators.required, Validators.pattern('^(USER|MANAGER|ADMIN)$')])],
      'apps': ['', Validators.required]
    });
  }


  private filter(term) {
    this.usersFilter = this.users.filter(d => {
      if (term) {
        return d.email && d.email.indexOf(term) >= 0;
      }
      return true;
    });
  }

  refresh() {
    this.userAction.searchUsers();
  }

  updateFilter(term) {
    this.searchUserStream.next(term);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  updateRole(user, role) {
    this.userAction.updateUser(user._id, { role: role });
  }

  create() {
    this.createUserModal.open();
    this.registerUserForm.reset();
  }

  saveUser(){
    if(this.registerUserForm.valid){
      let user = this.registerUserForm.value;
      this.userAction.createUser({
        email: user.email,
        role: user.role,
        extraUserData: {
          apps: user.apps.split(',')
        }
      });
    } else {
      alert('Invalid user');
    }
  }
}
