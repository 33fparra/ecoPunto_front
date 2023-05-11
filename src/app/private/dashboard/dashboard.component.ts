import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router) { }

  tipodeUsuario: string = ""
  nombUsuario:string=""
  titleCab: string = ''
  ngOnInit(): void {
    if (!localStorage.getItem('Login')) {
      this.router.navigate(['/login']);
    }
    this.tipodeUsuario = localStorage.getItem('TipUser')
    this.nombUsuario = localStorage.getItem('user')
    this.titleCab = `Bienvenido ${this.tipodeUsuario} , ${this.nombUsuario} : `
  }

}
