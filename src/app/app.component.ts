import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/auth.service';
import { URLSearchParams } from "@angular/http";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private active: ActivatedRoute) { }

  ngOnInit() {
    let params = new URLSearchParams(window.location.search.substring(1, window.location.search.length));
    let token = params.get('token');
    if (token) {
      this.tokenService.setToken(token);
    }
  }

}
