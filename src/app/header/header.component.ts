import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpServiceService, StatusResponse } from '../shared/http-service.service';
import { ServerStatusService } from '../shared/server-status.service';
import { BASE_URL } from '../app.globals'
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, throwError } from 'rxjs';
import { switchMap, retryWhen, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  account: string;
  django: boolean;
  fastapi: boolean;
  database: boolean;

  djangoNotif: boolean = false;
  fastapiNotif: boolean = false;
  databaseNotif: boolean = false;
  constructor(
    private router: Router,
    private httpService: HttpServiceService,
    private serverStatus: ServerStatusService,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.account = window.localStorage.getItem('account')
    // let url = 'http://127.0.0.1:9000/model_api_connection/health_check/'
    // const source = interval(5000); // change the interval time as per your requirement
    // source.pipe(
    //   switchMap(() => this.http.get(url).pipe(
    //     retryWhen(errors => errors.pipe(
    //       delay(5000), // wait for 5 seconds before retrying
    //       switchMap(() => throwError('Retrying...')) // retry the request
    //     ))
    //   ))
    // ).subscribe((res: StatusResponse)  =>  {
    //   if (res) {
    //     // console.log(res);

    //     this.serverStatus.django = res.django_status ? true : false;
    //     this.serverStatus.fastapi = res.fastapi_status ? true : false;
    //     this.serverStatus.database = res.database_status ? true : false;
    //     this.django = res.django_status ? true : false;
    //     this.fastapi = res.fastapi_status ? true : false;
    //     this.database = res.database_status ? true : false;


    //     // DJANGO
    //     if(!this.django && !this.djangoNotif) {
    //       this.openSnackBar('Django offline', 'CONNECTION');
    //       this.djangoNotif = true
    //     } 
        
    //     if(this.django && this.djangoNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.djangoNotif = false
    //     }

        
    //     // FASTAPI
    //     if(!this.fastapi && !this.fastapiNotif) {
    //       this.openSnackBar('FastAPI offline', 'CONNECTION');
    //       this.fastapiNotif = true
    //     } 
        
    //     if(this.fastapi && this.fastapiNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.fastapiNotif = false
    //     }
        

    //     // DATABASE
    //     if(!this.database && !this.databaseNotif) {
    //       this.openSnackBar('Database offline', 'CONNECTION');
    //       this.databaseNotif = true
    //     }
        
    //     if(this.database && this.databaseNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.databaseNotif = false
    //     }

    //     // console.log(this.serverStatus.django);
    //     // console.log(this.serverStatus.fastapi);
    //     // console.log(this.serverStatus.database);
    //   } else {
        
    //     this.serverStatus.django = false
    //     this.serverStatus.fastapi = false
    //     this.serverStatus.database = false
    //     this.django = false
    //     this.fastapi = false
    //     this.database = false

    //     // DJANGO
    //     if(!this.django && !this.djangoNotif) {
    //       this.openSnackBar('Django offline', 'CONNECTION');
    //       this.djangoNotif = true
    //     } 
        
    //     if(this.django && this.djangoNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.djangoNotif = false
    //     }

        
    //     // FASTAPI
    //     if(!this.fastapi && !this.fastapiNotif) {
    //       this.openSnackBar('FastAPI offline', 'CONNECTION');
    //       this.fastapiNotif = true
    //     } 
        
    //     if(this.fastapi && this.fastapiNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.fastapiNotif = false
    //     }
        

    //     // DATABASE
    //     if(!this.database && !this.databaseNotif) {
    //       this.openSnackBar('Database offline', 'CONNECTION');
    //       this.database = true
    //     }
        
    //     if(this.database && this.databaseNotif) {
    //       this.openSnackBar('FastAPI online', 'CONNECTION');
    //       this.databaseNotif = false
    //     }
    //   }
    // },
    // error => {
    //   this.serverStatus.django = false
    //     this.serverStatus.fastapi = false
    //     this.serverStatus.database = false
    //     this.django = false
    //     this.fastapi = false
    //     this.database = false

    //     // DJANGO
    //     if(!this.django && !this.djangoNotif) {
    //       this.openSnackBar('Django offline', 'CONNECTION');
    //       this.djangoNotif = true
    //     }

        
    //     // FASTAPI
    //     if(!this.fastapi && !this.fastapiNotif) {
    //       this.openSnackBar('FastAPI offline', 'CONNECTION');
    //       this.fastapiNotif = true
    //     }

    //     // DATABASE
    //     if(!this.database && !this.databaseNotif) {
    //       this.openSnackBar('Database offline', 'CONNECTION');
    //       this.databaseNotif = true
    //     }
        
    // })


    this.checkServersStatus();
    setInterval(() => {
      this.checkServersStatus();
    }, 7000);
  }

  onChangeAcc() {
    if(window.localStorage.getItem('account') == 'HumanResources') {
      window.localStorage.setItem('account', 'Operator')
      this.account = 'Operator'
      this.router.navigateByUrl('/operator/training')
    } else {
      window.localStorage.setItem('account', 'HumanResources')
      this.account = 'HumanResources'
      this.router.navigateByUrl('/hr/employees')
    }
  }

  reloadPage() {
    location.reload();
  }

  checkServersStatus() {
    let url = '/model_api_connection/health_check/'

    this.httpService.getData(url, {}).subscribe((res: StatusResponse)  =>  {
      if (res) {
        // console.log(res);

        this.serverStatus.django = res.response.django_status ? true : false;
        this.serverStatus.fastapi = res.response.fastapi_status ? true : false;
        this.serverStatus.database = res.response.database_status ? true : false;
        this.django = res.response.django_status ? true : false;
        this.fastapi = res.response.fastapi_status ? true : false;
        this.database = res.response.database_status ? true : false;


        // DJANGO
        if(!this.django && !this.djangoNotif) {
          this.openSnackBar('Django offline', 'CONNECTION');
          this.djangoNotif = true
        } 
        
        if(this.django && this.djangoNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.djangoNotif = false
        }

        
        // FASTAPI
        if(!this.fastapi && !this.fastapiNotif) {
          this.openSnackBar('FastAPI offline', 'CONNECTION');
          this.fastapiNotif = true
        } 
        
        if(this.fastapi && this.fastapiNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.fastapiNotif = false
        }
        

        // DATABASE
        if(!this.database && !this.databaseNotif) {
          this.openSnackBar('Database offline', 'CONNECTION');
          this.databaseNotif = true
        }
        
        if(this.database && this.databaseNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.databaseNotif = false
        }

        // console.log(this.serverStatus.django);
        // console.log(this.serverStatus.fastapi);
        // console.log(this.serverStatus.database);
      } else {
        
        this.serverStatus.django = false
        this.serverStatus.fastapi = false
        this.serverStatus.database = false
        this.django = false
        this.fastapi = false
        this.database = false

        // DJANGO
        if(!this.django && !this.djangoNotif) {
          this.openSnackBar('Django offline', 'CONNECTION');
          this.djangoNotif = true
        } 
        
        if(this.django && this.djangoNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.djangoNotif = false
        }

        
        // FASTAPI
        if(!this.fastapi && !this.fastapiNotif) {
          this.openSnackBar('FastAPI offline', 'CONNECTION');
          this.fastapiNotif = true
        } 
        
        if(this.fastapi && this.fastapiNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.fastapiNotif = false
        }
        

        // DATABASE
        if(!this.database && !this.databaseNotif) {
          this.openSnackBar('Database offline', 'CONNECTION');
          this.database = true
        }
        
        if(this.database && this.databaseNotif) {
          this.openSnackBar('FastAPI online', 'CONNECTION');
          this.databaseNotif = false
        }
      }
    },
    error => {
      this.serverStatus.django = false
        this.serverStatus.fastapi = false
        this.serverStatus.database = false
        this.django = false
        this.fastapi = false
        this.database = false

        // DJANGO
        if(!this.django && !this.djangoNotif) {
          this.openSnackBar('Django offline', 'CONNECTION');
          this.djangoNotif = true
        }

        
        // FASTAPI
        if(!this.fastapi && !this.fastapiNotif) {
          this.openSnackBar('FastAPI offline', 'CONNECTION');
          this.fastapiNotif = true
        }

        // DATABASE
        if(!this.database && !this.databaseNotif) {
          this.openSnackBar('Database offline', 'CONNECTION');
          this.databaseNotif = true
        }
        
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
