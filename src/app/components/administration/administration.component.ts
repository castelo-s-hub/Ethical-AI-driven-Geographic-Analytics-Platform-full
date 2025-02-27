import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  userEmail: string = '';
  profileLetter: string = '';

  constructor(private cookieService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userEmail = this.cookieService.userEmail().toString()
    this.profileLetter = this.userEmail[0];
  }

  signOut() {
    this.cookieService.logout();
    this.router.navigate(['/login/signin']);
  }
}
