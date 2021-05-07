import { TestBed } from '@angular/core/testing';

import { UserTableService } from './user-Table.service';

describe('UserServiceService', () => {
  let service: UserTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
