import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuitPompeComponent } from './puit-pompe.component';

describe('PuitPompeComponent', () => {
  let component: PuitPompeComponent;
  let fixture: ComponentFixture<PuitPompeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuitPompeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuitPompeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
