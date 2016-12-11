import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text = "";
  @Input() basic = false;
  @Input() table = false;
  @Output() click = new EventEmitter();

  constructor() { }

  onClick(e) {
    this.click.emit(e)
  }

}
