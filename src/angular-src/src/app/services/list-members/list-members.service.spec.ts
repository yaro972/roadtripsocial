import {inject, TestBed} from '@angular/core/testing';

import {ListMembersService} from './list-members.service';

describe('ListMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListMembersService]
    });
  });

  it('should be created', inject([ListMembersService], (service: ListMembersService) => {
    expect(service).toBeTruthy();
  }));
});
