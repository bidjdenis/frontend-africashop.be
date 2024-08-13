import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsLegaleComponent } from './mentions-legale.component';

describe('MentionsLegaleComponent', () => {
  let component: MentionsLegaleComponent;
  let fixture: ComponentFixture<MentionsLegaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentionsLegaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MentionsLegaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
