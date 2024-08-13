import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdvComponent } from './cdv.component';

describe('CdvComponent', () => {
  let component: CdvComponent;
  let fixture: ComponentFixture<CdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
