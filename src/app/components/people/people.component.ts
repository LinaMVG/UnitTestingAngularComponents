import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-people',
    standalone: true,
    imports: [PersonComponent,CommonModule],
    templateUrl: './people.component.html',
    styleUrl: './people.component.scss',
})

export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Lina', 'Velasquez', 24, 55, 1.6),
    new Person('Marcela', 'Velasquez', 12, 42, 1.4),
  ];
  selectedPerson: Person | null = null;

  constructor(){};

  choose(person: Person) {
    this.selectedPerson = person;
  }

  ngOnInit():void{};
}
