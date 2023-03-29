import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  account: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.account = window.localStorage.getItem('account')
  }

  onChangeAcc() {
    if(window.localStorage.getItem('account') == 'HumanResources') {
      this.router.navigateByUrl('/operator')
      window.localStorage.setItem('account', 'Operator')
      this.account = 'Operator'
    } else {
      this.router.navigateByUrl('/hr')
      window.localStorage.setItem('account', 'HumanResources')
      this.account = 'HumanResources'
    }
  }

  reloadPage() {
    location.reload();
  }

}
