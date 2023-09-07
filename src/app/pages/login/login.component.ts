import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public errorMessage: string = '';
  public user: User = { email: '', password: '', name: "" };
  public users: User[] = [];

  public passwordType: string = "password";
  public passwordShown: boolean = false;
  public pathIcon: string = 'assets/icons/closed-eye.png';

  constructor (
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.userService
      .getUsers()
      .subscribe((users) => {
        this.users = users;
        if (
          !!this.users
          .find((user) => user.email == this.user.email && user.password == this.user.password)
        ) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router
            .navigate(['/home']);
        } else {
          this.errorMessage = 'Email or password invalid!';
        }
      })
  }

  togglePassword() {
    this.passwordShown = !this.passwordShown;
    if(this.passwordShown) {
      this.passwordType = 'text';
      this.pathIcon = '../assets/icons/eye.png';
    } else {
      this.passwordType = 'password';
      this.pathIcon = '../assets/icons/closed-eye.png';
    }
  }  

  public createAccount(): void {
    this.router
      .navigate(['/register']);
  }
}
