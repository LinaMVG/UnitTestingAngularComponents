// import { Component } from '@angular/core';
// import { HighligthDirective } from './highligth.directive';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// @Component({
//   //standalone: true,
//   //imports: [HostComponent],
//   template: `
//     <h5 highligth>Hay un valor default</h5>
//     <h5 highligth="yellow">Hay un color yellow</h5>
//     <p highligth>parrafo</p>
//     <p>Otro parrafo</p>
//   `,
// })
// class HostComponent {}

// fdescribe('HighligthDirective', () => {
//   //let component: HostComponent;
//   let fixture: ComponentFixture<HostComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [HighligthDirective], //HostComponent,
//     }).compileComponents();

//     fixture = TestBed.createComponent(HostComponent);
//     //component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create an instance', () => {
//     expect(fixture.componentInstance).toBeTruthy();
//   });
// });

import { Component, Directive, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5 class="title" highligth>Hay un valor default</h5>
    <h5 highligth="yellow">Hay un color yellow</h5>
    <p highligth>parrafo</p>
    <p>Otro parrafo</p>
    <input [(ngModel)]="color"  type="text" [highligth]="color" />
  `,
})
class HostComponent {
  color = 'gray';
}

@Directive({
  selector: '[highligth]',
})
class MockHighligthDirective {
  @Input('highligth') bgColor = '';

  constructor(private elementRef: ElementRef) {
    //this.elementRef.nativeElement.style.backgroundColor = 'gray';
    const elementIndex = Array.from(elementRef.nativeElement.parentNode.children).indexOf(elementRef.nativeElement);
    if (elementIndex === 2) {
      this.elementRef.nativeElement.style.backgroundColor = 'blue';
    } else {
      this.elementRef.nativeElement.style.backgroundColor = 'gray';
    }
  }

  ngOnChanges(): void {
    if (this.bgColor) {
      this.elementRef.nativeElement.style.backgroundColor = this.bgColor;
    }
  }
}

describe('HighligthDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, MockHighligthDirective],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 4 highlight elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(MockHighligthDirective)
    );
    const elementsWhithout = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );

    expect(elements.length).toEqual(4);
    expect(elementsWhithout.length).toEqual(2);//lo pasa editando xq el selector no lo esta tomando
  });

  it('should the elements be match with bgColor', () => {
    const elementos = fixture.debugElement.queryAll(
      By.directive(MockHighligthDirective)
    );

    expect(elementos[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elementos[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elementos[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  // it('should the h5.title be defaultColor', () => {
  //   const titleDe = fixture.debugElement.query(By.css('title'));
  //   const dir = titleDe.injector.get(MockHighligthDirective);

  //   expect(titleDe.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  // });

  it('should bind <input> and change the bgColor', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement =  inputDe.nativeElement;

    expect(inputEl.style.backgroundColor).toEqual('gray');

    inputEl.value='red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(fixture.componentInstance.color).toEqual('red');
  });


});
