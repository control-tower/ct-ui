import { Observable } from 'rxjs/Rx';
import { AuthSelector } from './../../selectors/auth';
import { AuthAction } from './../../actions/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token$: Observable<string>

  constructor(private authAction: AuthAction, private authSelector: AuthSelector) { }

  ngOnInit() {
    this.authAction.generateToken();
    this.token$ = this.authSelector.getToken();
  }

  generateToken() {
    this.authAction.generateToken();
  }

}
