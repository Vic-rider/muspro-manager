import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForageComponent } from './forage.component';

describe('ForageComponent', () => {
  let component: ForageComponent;
  let fixture: ComponentFixture<ForageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
