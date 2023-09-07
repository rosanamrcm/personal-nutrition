import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/interface/schedule';
import { User } from 'src/app/interface/user';
import { ScheduleService } from 'src/app/service/schedule.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public user: User = {
    email: '',
    password: '',
    name: ''
  };

  public schedules: any[] = [];
  public historics: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private scheduleService: ScheduleService
  ) {}

  public ngOnInit(): void {
    this.getUserName();
    this.getHistorics();
    this.getSchedules();
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public getUserName(): void {
    this.userService
      .getUsers()
      .subscribe((users) => {
        this.user.name = users
          .find(u => u.email == this.userService.getUserEmailFromLocalStorage())?.name;
      });
  }

  public getSchedules(): void {
    this.scheduleService
      .getSchedules()
      .subscribe((schedules) => {
        let schedulesObserver: any[] = schedules;
        this.schedules = schedulesObserver
          .filter(
            schedule => schedule.done == false &&
            schedule.email == this.userService.getUserEmailFromLocalStorage());
      })
  }

  public getHistorics(): void {
    this.scheduleService
      .getSchedules()
      .subscribe((schedules) => {
        let schedulesObserver: any[] = schedules;
        this.historics = schedulesObserver
          .filter(
            schedule => schedule.done == true && 
            schedule.email == this.userService.getUserEmailFromLocalStorage());
      })
  }

  public cancelSchedule(schedule: Schedule): void {
    let index = this.schedules.indexOf(schedule);
    console.log(index);
    console.log(schedule);
    this.schedules.splice(index, 1);
  }

  public openModal(modalId: string): void {
    document.getElementById(modalId)?.classList.add('open');
  }

  public closeModal(): void {
    document.querySelector('.jw-modal.open')?.classList.remove('open');
  }
}
