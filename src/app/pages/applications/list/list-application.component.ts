import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationSelector } from './../../../selectors/application.selector';
import { ApplicationAction } from './../../../actions/application.action';
import { Subject } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { IApplication } from './../../../models/application.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.scss']
})
export class ListApplicationComponent implements OnInit {

  applications: IApplication[]
  applicationsFilter: IApplication[]
  applicationSub: Subscription
  filterText: string = ''

  private searchApplicationStream = new Subject<string>()

  @ViewChild('createApplicationModal') createApplicationModal
  createApplicationForm: FormGroup
  allowedApplications: string[] = []

  constructor(private applicationAction: ApplicationAction, private applicationSelector: ApplicationSelector, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.applicationAction.searchApplications();
    this.applicationSub = this.applicationSelector.getApplications().map((data) => data.map((el) => Object.assign({}, el))).subscribe((data) => {
      this.applications = data;
      this.filter(this.filterText);
    });

    this.searchApplicationStream
      .debounceTime(300)
      .distinctUntilChanged()
      .map(term => this.filterText = term)
      .subscribe(term => this.filter(term.toLowerCase()));

    this.createApplicationForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'allowedApplications': [],
      'allowedDomains': ['']
    });

    this.allowedApplications = this.authService.getApplications().filter((app) => app !== 'control-tower');
  }

  private filter(term){
    this.applicationsFilter = this.applications.filter(d => {
      return d.name.toLowerCase().indexOf(term) >= 0;
    });
  }

  refresh(){
    this.applicationAction.searchApplications();
  }

  updateFilter(term) {
    this.searchApplicationStream.next(term);
  }

  ngOnDestroy() {
    this.applicationSub.unsubscribe();
  }

  create(event) {
    this.createApplicationModal.open();
    this.createApplicationForm.reset();
  }

  saveApplication(){
    if(this.createApplicationForm.valid){
      let app = this.createApplicationForm.value;
      this.applicationAction.createApplication(app);
    }
  }

}
