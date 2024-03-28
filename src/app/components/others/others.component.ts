import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighligthDirective } from '../../directivas/highligth.directive';
import { ReservePipe } from "../../pipes/reserve.pipe";

@Component({
    selector: 'app-others',
    standalone: true,
    templateUrl: './others.component.html',
    styleUrl: './others.component.scss',
    imports: [FormsModule, HighligthDirective, ReservePipe]
})
export class OthersComponent implements OnInit{

  color = 'blue';
  text = 'roma';

  constructor() {}

  ngOnInit(): void {

  }

}
