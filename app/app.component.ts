import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import studentsData from './Results.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular 5';
  jsonDataKeys: any = [];
  rollNumber = '';
  studentName = '';
  studentResult: any;
  classnumber = '';

  noResult = false;
  jsonData: any = [];
  Form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.Form = this.fb.group({
      class: ['', [Validators.required]],
      rollNo: ['', [Validators.required]],
    });

    for (let arr of this.jsonData) {
      Object.keys(arr) &&
        Object.keys(arr).map((key) => {
          console.log('push');
          this.jsonDataKeys.push(key);
        });
    }
  }

  convert(obj) {
    return Object.keys(obj).map((key) => ({
      name: key,
      value: obj[key],
    }));
  }

  checkResults() {
    console.log(this.Form.controls.class.value);
    this.Form.get('class').markAsTouched();
    this.Form.get('rollNo').markAsTouched();

    if (this.Form.valid) {
      try {
        this.studentResult = null;
        this.noResult = true;
        this.classnumber = this.Form.get('class').value;
        this.rollNumber = this.Form.get('rollNo').value;

        for (let result of studentsData[this.classnumber]) {
          if (this.rollNumber.valueOf() == result['RollNo']) {
            this.studentName = result['Name'];
            result = this.convert(result);
            result = result.slice(2, result.keys().length);
            this.studentResult = result;
            this.noResult = false;
          }
        }
      } catch {
        this.noResult = true;
      }
    }
  }
}
