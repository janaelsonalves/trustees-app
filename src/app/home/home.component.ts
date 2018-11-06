import { Component, OnInit, ViewChild } from '@angular/core';
import { TrusteesApiService } from '../services/trustees-api.service';
import * as xml2js from 'xml2js';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users: any;

  public dataSource: MatTableDataSource<any>;
  displayedColumns = ['first', 'last', 'email', 'address', 'created', 'balance'];

  @ViewChild(MatPaginator) paginator;
  @ViewChild(MatSort) sort;

  constructor(private trusteeApi: TrusteesApiService) { }

  ngOnInit(): void {
    this.trusteeApi.getTrustees().subscribe((data) => {
      xml2js.parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          this.users = result.user.results;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      })
    });
  }

}
