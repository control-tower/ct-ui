import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private tokenService: TokenService) { }

  logout(e){
    this.tokenService.logout();
  }

}
