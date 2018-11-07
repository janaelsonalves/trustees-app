import { Component, OnInit } from '@angular/core';
import { TrusteesApiService } from './services/trustees-api.service';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trustees-app';

  /*   private results: any; */

  constructor(private trusteeApi: TrusteesApiService) { }

  ngOnInit(): void {
    /*  this.trusteeApi.getTrustees().subscribe((data) => {
       xml2js.parseString(data, { explicitArray: false }, (err, result) => {
         if (err) {
           console.error(err);
         } else {
           this.results = result;
         }
       })
       console.log('Data:\n', this.results.user.results)
     }); */
    console.log('App component works!');
  }
}
