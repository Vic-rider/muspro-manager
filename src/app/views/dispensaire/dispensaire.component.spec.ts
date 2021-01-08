import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaireComponent } from './dispensaire.component';

describe('DispensaireComponent', () => {
  let component: DispensaireComponent;
  let fixture: ComponentFixture<DispensaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
