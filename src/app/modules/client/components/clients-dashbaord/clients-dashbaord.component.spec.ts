import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDashbaordComponent } from './clients-dashbaord.component';

describe('ClientsDashbaordComponent', () => {
  let component: ClientsDashbaordComponent;
  let fixture: ComponentFixture<ClientsDashbaordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsDashbaordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
