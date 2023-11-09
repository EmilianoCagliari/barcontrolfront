import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css']
})
export class OptionCardComponent {

  @Input() title: string = "";
  @Input() icon: string = "";
  @Input() color: string = "";
  @Input() route: string = "";
 

  constructor( 
    private router: Router
  ) {}

  navigate() {
    this.router.navigate([ 'home/create', this.route ]);
  }

}
