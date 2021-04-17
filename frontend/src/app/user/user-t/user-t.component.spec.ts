import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTComponent } from './user-t.component';

describe('UserTComponent', () => {
  let component: UserTComponent;
  let fixture: ComponentFixture<UserTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
