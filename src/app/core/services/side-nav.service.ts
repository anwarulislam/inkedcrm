import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  $dynamicForm: Subject<any> = new BehaviorSubject('');

  constructor() {}
}
