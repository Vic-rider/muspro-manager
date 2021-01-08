import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphelinatComponent } from './orphelinat.component';

describe('OrphelinatComponent', () => {
  let component: OrphelinatComponent;
  let fixture: ComponentFixture<OrphelinatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrphelinatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrphelinatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
