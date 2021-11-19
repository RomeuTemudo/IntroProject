import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Sensor } from 'src/app/interfaces/sensor';
import { SensorService } from 'src/app/services/sensors/sensor.service';

@Component({
  selector: 'app-sensor-search',
  templateUrl: './sensor-search.component.html',
  styleUrls: ['./sensor-search.component.css'],
})
export class SensorSearchComponent implements OnInit {
  public selectedSensor?: Sensor | null = null;

  sensors$!: Observable<Sensor[]>;
  private searchTerms = new Subject<string>();

  constructor(private sensorService: SensorService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.sensors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        if (term.length === 0) {
          this.selectedSensor = null;
        }

        return this.sensorService.searchSensors(term);
      })
    );
  }

  onSelect(sensor: Sensor): void {
    this.selectedSensor = sensor;
  }
}
