import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamDetailsComponent } from './new-teamdetails.component';

describe('NewTeamDetailsComponent', () => {
  let component: NewTeamDetailsComponent;
  let fixture: ComponentFixture<NewTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTeamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
