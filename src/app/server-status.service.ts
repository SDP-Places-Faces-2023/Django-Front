import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerStatusService {
  django: boolean = false;
  fastapi: boolean = false;
  database: boolean = false;
}