import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-main',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
})
export class MainComponent {}
