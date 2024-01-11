import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-forecast-new',
  templateUrl: './forecast-new.component.html',
  styleUrls: ['./forecast-new.component.scss']
})
export class ForecastNewComponent implements OnInit {
  draftItem: any;

  constructor(private sanitizer: DomSanitizer) { }

  addForecastForm = new FormGroup({
    title: new FormControl(null,[
      Validators.required
    ]),
    cont: new FormControl(null,[
      Validators.required
    ])
  })

  ngOnInit(): void {
    if (sessionStorage.getItem('addForecastForm')) {
      this.draftItem = JSON.parse(sessionStorage.getItem('addForecastForm')!);
      this.addForecastForm.setValue(JSON.parse(sessionStorage.getItem('addForecastForm')!));
    }

    this.draftItem.cont = this.sanitizer.bypassSecurityTrustHtml(this.draftItem.cont);
    this.draftItem.cont = this.draftItem.cont.replace(/[\r\n]+/g," ")
  }

  saveForecast() {

  }

  saveDraft() {
    sessionStorage.setItem('addForecastForm', JSON.stringify(this.addForecastForm.value));
    location.reload();
  }

}
