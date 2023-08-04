import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css']
})
export class HomeButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  NavigateHome(){
    window.location.href = environment.Homelink;
  }

}
