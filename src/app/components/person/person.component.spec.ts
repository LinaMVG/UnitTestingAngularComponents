import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    //component.person = new Person('Lina', 'Velásquez',24,55,1.60);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Lina"', ()=>{
    component.person = new Person('Lina', 'Velásquez',24,55,1.60);
    expect(component.person.name).toEqual('Lina')
  })

  it('should have <p> with "Mi altura es {{person.height}"',()=>{
    component.person = new Person('Lina', 'Velásquez',24,55,1.60);
    const expectMsg = `Mi altura es ${component.person.height}`
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement: HTMLElement = pDebug.nativeElement;
    //const p = personElement.querySelector('p');

    fixture.detectChanges();

    expect(personElement?.textContent).toEqual(expectMsg);
    expect(personElement?.textContent).toContain(expectMsg); //por si no se quiere ser tan especificos en simbolos :
  })


  it('should have <h3> with "Hola,  ${component.person.name}"',()=>{
    //Arrange
    component.person = new Person('Lina', 'Velásquez',24,55,1.60);
    const expectMsg = `Hola, ${component.person.name}`
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;

    //Act
    fixture.detectChanges();

    //Assert
    expect(h3?.textContent).toEqual(expectMsg);
  })

  ;
});
