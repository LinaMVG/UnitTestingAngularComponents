import { Component } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonComponent } from "../person/person.component";

@Component({
    selector: 'app-people',
    standalone: true,
    templateUrl: './people.component.html',
    styleUrl: './people.component.scss',
    imports: [PersonComponent]
})
export class PeopleComponent {
  person: Person = new Person('Lina', 'Velasquez',24,55,1.60)

}
