import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryProductComponent } from './country-product.component';

describe('CountryProductComponent', () => {
  let component: CountryProductComponent;
  let fixture: ComponentFixture<CountryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
