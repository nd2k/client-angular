import { TestBed } from '@angular/core/testing';

import { HtmlElService } from './html-el.service';

describe('HtmlElService', () => {
  let service: HtmlElService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlElService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
