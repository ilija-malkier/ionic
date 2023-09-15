import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  addCarPost() {
    this.router.navigate(['seller/post/create'])
  }
}
