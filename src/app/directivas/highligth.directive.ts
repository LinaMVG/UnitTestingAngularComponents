import { Directive, ElementRef,Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highligth]',
  standalone: true
})
export class HighligthDirective implements OnChanges{

  defaultColor = 'gray';
  @Input('highligth') bgColor = '';

  constructor(
    private element: ElementRef
  ) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
   }

   ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
   }

}
