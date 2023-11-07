import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent {

  @Input() title: string = "";
  @Input() icon: string = "";
  @Input() color: string = "";



}
