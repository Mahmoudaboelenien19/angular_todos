import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSubject = new Subject<any>();
  emit(eventName: string, payload: any) {
    this.eventSubject.next({ eventName, payload });
  }

  listen(eventName: string, callback: (event: any) => void) {
    this.eventSubject.asObservable().subscribe((next) => {
      if (eventName === next.eventName) {
        callback(next.payload);
      }
    });
  }
}
