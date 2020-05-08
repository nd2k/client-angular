import { TestBed } from '@angular/core/testing';

import { TokenInterceporService } from './token-intercepor.service';

describe('TokenInterceporService', () => {
  let service: TokenInterceporService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceporService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
