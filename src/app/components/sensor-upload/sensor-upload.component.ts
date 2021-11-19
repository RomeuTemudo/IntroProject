import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { LoadingService } from 'src/app/services/loading.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sensor-upload',
  templateUrl: './sensor-upload.component.html',
  styleUrls: ['./sensor-upload.component.css'],
})
export class SensorUploadComponent implements OnInit {
  dataFromSensor: any;

  /*<app-sensor-upload (sendDataToParent)="getSensorData($event)"></app-sensor-upload>*/
  @Output() sendDataToParent = new EventEmitter();
  @Output() sendData = new EventEmitter();

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _snackBar: MatSnackBar,
    private papa: Papa,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  downloadFile(): void {}

  UploadedFile($event: any) {
    const fileList = $event.srcElement.files;
    this.parseCsvFile(fileList[0]);
  }

  showSnack(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  callbackParse(callbackResults: any) {
    this.loadingService.hide();

    this.dataFromSensor = callbackResults.data;

    //on create sensor upload
    this.sendDataToParent.emit(this.dataFromSensor);

    //on sensor details upload
    this.sendData.emit(this.dataFromSensor);
  }

  parseCsvFile(file: string) {

    this.loadingService.show();

    this.papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      worker: true,
      complete: (results) => {
        this.callbackParse(results);
      },
      error: this.papaParseErrorFunction,
    });
  }

  papaParseErrorFunction(error: any) {

  }
}
