import { AuthService } from './../../../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSelector } from './../../../selectors/application.selector';
import { ApplicationAction } from './../../../actions/application.action';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IApplication } from './../../../models/application.model';
import { Component, OnInit, ViewChild } from '@angular/core';

const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

@Component({
  selector: 'app-detail-application',
  templateUrl: './detail-application.component.html',
  styleUrls: ['./detail-application.component.scss']
})
export class DetailApplicationComponent implements OnInit {

  application: IApplication
  users: any[]

  applicationSub: Subscription
  paramsSub: Subscription

  @ViewChild('addUserModal') addUserModal
  addUserForm: FormGroup
  roles: string[] = []


  constructor(private applicationAction: ApplicationAction, private applicationSelector: ApplicationSelector, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.paramsSub = this.activatedRoute.params.subscribe((params) => {
      if (params['slug']){
        this.applicationAction.getApplicationBySlug(params['slug']);
        const role = this.authService.getRoleInApp(params['slug']);
        if (role) {
          switch (role) {
            case 'ADMIN':
              this.roles.push('ADMIN');
            case 'MANAGER':
              this.roles.push('MANAGER');
            case 'USER':
              this.roles.push('USER');
          }
        }
      }
    });
    this.applicationSub = this.applicationSelector.getApplicationDetail().subscribe((data) => {
      this.application = data;
      if (this.application && this.application.users) {
        this.users = this.application.users.map((data) => Object.assign({}, data))
      }
    });

    this.addUserForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      'role': ['', Validators.required]
    });

  }

  ngOnDestroy() {
    this.applicationSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  saveUser(event) {
    if(this.addUserForm.valid){
      let user = this.addUserForm.value;
      this.applicationAction.addUser(this.application.slug, {
        email: user.email,
        role: user.role
      });
    }
  }

  updateRole(user, role) {
    // this.userAction.updateUser(user._id, { role: role });
  }

  deleteUser(user) {
    if (window.confirm('Are you sure that you want remove the user?')){

    }
  }

  addUser() {
    this.addUserModal.open();
    this.addUserForm.reset();
  }
}
