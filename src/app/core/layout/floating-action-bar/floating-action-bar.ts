import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-floating-action-bar',
  imports: [MatChipsModule],
  templateUrl: './floating-action-bar.html',
  styleUrl: './floating-action-bar.scss',
})
export class FloatingActionBar {}
