import { TestBed } from '@angular/core/testing';

import { TeamDetailsService } from './teamdetails.service';

describe('TeamDetailsService', () => {
  let service: TeamDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
