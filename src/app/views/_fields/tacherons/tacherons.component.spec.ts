import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheronsComponent } from './tacherons.component';

describe('TacheronsComponent', () => {
  let component: TacheronsComponent;
  let fixture: ComponentFixture<TacheronsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheronsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
