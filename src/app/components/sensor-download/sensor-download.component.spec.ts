import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDownloadComponent } from './sensor-download.component';

describe('SensorDownloadComponent', () => {
  let component: SensorDownloadComponent;
  let fixture: ComponentFixture<SensorDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
