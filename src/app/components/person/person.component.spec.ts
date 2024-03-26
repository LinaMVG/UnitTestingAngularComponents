import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

describe('PersonComponent', () => {
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

  it('should display a text with IMC when dcall calcIMC()',()=>{
    const expectMsg ='OverWeight level 3';
    component.person = new Person('Marcela', 'Velásquez',24,120,1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;

    component.calcIMC();
    fixture.detectChanges();

    expect(button.textContent).toContain(expectMsg)
  });

  it('should display a text with IMC when do clic',()=>{
    const expectMsg ='OverWeight level 3';
    component.person = new Person('Marcela', 'Velásquez',24,120,1.65);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement

    buttonDebug.triggerEventHandler('click',null);
    fixture.detectChanges();

    expect(buttonElement.textContent).toContain(expectMsg)
  });

  it('should raise selected event when do clic',()=>{
    const expectPerson = new Person('Marcela', 'Velásquez',24,120,1.65);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectdPerson: Person |undefined;
    component.onSelected
    .subscribe(person=>{
      selectdPerson = person;
    });

    buttonDebug.triggerEventHandler('click',null);
    fixture.detectChanges();

    expect(selectdPerson).toEqual(expectPerson);
  })
});

@Component({
  standalone: true,
  imports: [PersonComponent],
  template:' <app-person [person]="person" (onSelected)="onSelected($event)"></app-person>'
})
class HostComponent{
  person = new Person('Marcela','Garzón',12,40,1.50);
  selectedPerson: Person | undefined;

  onSelected(person: Person){
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent',()=>{
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a name person',()=>{
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3E1 = h3Debug.nativeElement;

    fixture.detectChanges();

    expect(h3E1.textContent).toContain(expectName);
  });

  it('should raise selected event when clickedn',()=>{
    const expectName = component.person.name;
    const btnDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));


    btnDebug.triggerEventHandler('click',null);
    fixture.detectChanges();

    expect(component.selectedPerson).toEqual(component.person);
  });

})
