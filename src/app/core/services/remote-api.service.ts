import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, finalize, tap, throwError } from 'rxjs';
import { parsers } from "@app/common";
import { WorkingService } from "./working.service";

export type API_ENDPOINT = 'products' | 'users';
@Injectable({
  providedIn: 'root'
})
export class RemoteApiService {
  protected readonly BASE_URL = 'https://fakestoreapi.com/';
  protected readonly DELAY = 2000;

  constructor(
    protected http: HttpClient,
    protected workingService: WorkingService
  ) { }

  fetch(what: API_ENDPOINT): Observable<any> {
    const url = this.BASE_URL + what;
    this.setWorking(true);
    return this.http.get(url)
      .pipe(
        delay(this.DELAY),
        tap((result) => {
          console.log("RemoteApiService - fetch", {what, result});
        }),
        catchError((err) => {
          console.warn("RemoteApiService - fetch ERROR", {what, err});
          return throwError(() => this.buildErrorMessage(err));
        }),
        finalize(() => {
          this.setWorking(false);
          console.log("RemoteApiService - fetch - DONE", {working: this.workingService.isWorking})
        })
      )
  }


  protected buildErrorMessage(err: any): string {
    return parsers.fromHttpError(err) ?? 'Unknown error returned by remote api';
  }


  protected setWorking(state: boolean) {
    this.workingService.setWorking('RemoteApiService', state);
  }
}