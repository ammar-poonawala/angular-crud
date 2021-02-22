import { TestBed } from '@angular/core/testing';

import { DataOperationsService } from './data-operations.service';

describe('DataOperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataOperationsService = TestBed.get(DataOperationsService);
    expect(service).toBeTruthy();
  });
});
