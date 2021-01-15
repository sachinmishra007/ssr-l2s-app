import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchieveMfeComponent } from './achieve-mfe.component';

describe('AchieveMfeComponent', () => {
  let component: AchieveMfeComponent;
  let fixture: ComponentFixture<AchieveMfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchieveMfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchieveMfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
