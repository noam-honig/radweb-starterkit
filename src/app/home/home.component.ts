import { Component, OnInit } from '@angular/core';
import { GridSettings } from 'radweb';
import { Categories } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = new GridSettings(new Categories(),{
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true
  });
  constructor() { }

  ngOnInit() {
  }

}
