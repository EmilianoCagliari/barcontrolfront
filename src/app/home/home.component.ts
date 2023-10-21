import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { LocalstorageService } from '../helpers/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(
    private readonly router:Router,
    private readonly localstorage: LocalstorageService
  ){}
 

  Logout(){

    this.localstorage.LocalClearData();
    this.router.navigate(['#']);
  }

}
