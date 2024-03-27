import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of , defer} from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/product.service';
import { ValueService } from '../../services/value.service';
import { generateManyProducts } from '../../models/product.mock';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>
  let valueService : jasmine.SpyObj<ValueService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        {provide: ProductsService, useValue: productServiceSpy},
        {provide: ValueService, useValue: valueServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>

    const productMock = generateManyProducts(3);

    productService.getAll.and.returnValue(of(productMock))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAll',()=>{
    it('should return a list product from service',()=>{
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productMock));
      const countPrev = component.products.length;

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.products.length).toEqual(productMock.length + countPrev);
    });

    it('should change the status "loading" to "success"',fakeAsync(()=>{
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(()=>Promise.resolve(productMock)));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick();
      fixture.detectChanges();

      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" to "error"',fakeAsync(()=>{
      productService.getAll.and.returnValue(defer(()=>Promise.reject('error')));

      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(4000);
      fixture.detectChanges();

      expect(component.status).toEqual('error');
    }));


  })

  describe('test for callPromise',()=>{
    it('should call to promise',fakeAsync(()=>{
      const mockMsg = 'my mock';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));


      component.callPromise();
      tick();
      fixture.detectChanges();

      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));

    it('should show "my mock string" in <p> when btn was clicked',fakeAsync(()=>{
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const btnDebug = fixture.debugElement.query(By.css('.btn-promise'))

      btnDebug.triggerEventHandler('click',null);
      tick();
      fixture.detectChanges();

      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));

  })
});
