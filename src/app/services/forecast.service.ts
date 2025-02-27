import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ForecastModel} from "../shared/model/Forecast.model";

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  baseUrl = environment.apiUrl; //'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient) { }

  public getForecast(): Observable<any> {
    return this.http.get(this.baseUrl + 'forecast');
  }

  public createForecast(forecast: ForecastModel): Observable<any> {
    return this.http.post(this.baseUrl + 'forecast', {
      title: forecast.title,
      dateTime: forecast.dateTime,
      description: forecast.description,
      likes: forecast.likes
    });
  }

  public updateForecast(forecast: ForecastModel): Observable<any> {
    return this.http.put(this.baseUrl + 'forecast/' + forecast.id, {
      title: forecast.title,
      dateTime: forecast.dateTime,
      description: forecast.description,
      likes: forecast.likes
    });
  }

  public deleteForecast(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'forecast/delete/' + id);
  }
}
