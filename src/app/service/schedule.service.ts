import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../interface/schedule';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getSchedules(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(`${environment.API_PATH}/schedule`);
  }
}
