import { TestBed } from '@angular/core/testing';

import { HandleKeywordService } from './handle-keyword.service';

describe('HandleKeywordService', () => {
  let service: HandleKeywordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleKeywordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
