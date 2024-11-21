import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/UserService';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-inf-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inf-user.component.html',
  styleUrls: ['./inf-user.component.css']
})

export class InfUserComponent implements OnInit {
  userData: any | null = null;

  constructor(private userService: UserService, private router: Router) { }

  goBack(): void {
    this.router.navigate(['form-user']);
  }

  ngOnInit(): void {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
    });
  }
}
