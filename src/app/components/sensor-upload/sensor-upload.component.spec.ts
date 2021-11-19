import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorUploadComponent } from './sensor-upload.component';

describe('SensorUploadComponent', () => {
  let component: SensorUploadComponent;
  let fixture: ComponentFixture<SensorUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
