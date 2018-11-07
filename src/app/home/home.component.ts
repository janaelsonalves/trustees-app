import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import * as xml2js from 'xml2js';

import { TrusteesApiService } from '../services/trustees-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users = [];
  private isLoadingResults = true;
  private resultsLength: number = 0;

  public dataSource: MatTableDataSource<any>;
  displayedColumns = ['created', 'first', 'last',/*  'email', 'address', */ 'balance'];

  @ViewChild(MatPaginator) paginator;
  @ViewChild(MatSort) sort;

  constructor(private trusteeApi: TrusteesApiService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    /* this.trusteeApi.getTrustees().subscribe((data) => {
      xml2js.parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          this.users = result.user.results;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoadingResults = false;
        }
      })
    }); */
    this.getUsers();
  }

  getUsers() {
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.trusteeApi!.getTrustees();
        }),
        map((data: any) => {
          xml2js.parseString(data, { explicitArray: false }, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              this.users = result.user.results;
              //   this.resultsLength = this.users.length;              
              this.isLoadingResults = false;
            }
          })
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(() => {
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

}
