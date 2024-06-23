import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
})
export class MainComponent {}
