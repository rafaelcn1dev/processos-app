import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatListModule, MatIconModule]
})
  
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
