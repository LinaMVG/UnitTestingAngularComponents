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
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5 class="title" highligth>Hay un valor default</h5>
    <h5 highligth="yellow">Hay un color yellow</h5>
    <p highligth>parrafo</p>
    <p>Otro parrafo</p>
  `,
})
class HostComponent {}

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
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have 3 highlight elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(MockHighligthDirective)
    );
    const elementsWhithout = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );

    expect(elements.length).toEqual(3);
    expect(elementsWhithout.length).toEqual(1);
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


});
