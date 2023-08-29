import { TestBed } from '@angular/core/testing';

import { NotionApiService } from './notion-api.service';

describe('NotionApiService', () => {
  let service: NotionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
