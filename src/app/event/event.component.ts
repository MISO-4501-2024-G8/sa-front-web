import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { EventService } from './event.service';
import { SportEvent } from '../models/sport_event';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = '';
  events:SportEvent[] = [];
  allSources: string[] = [
    '../../assets/pics/run_1.jpeg',
    '../../assets/pics/run_2.jpeg',
    '../../assets/pics/run_3.jpeg',
    '../../assets/pics/run_4.jpeg',
    '../../assets/pics/run_5.jpeg',
    '../../assets/pics/bici_1.jpeg',
    '../../assets/pics/bici_2.jpeg',
    '../../assets/pics/bici_3.jpeg',
    '../../assets/pics/bici_4.jpeg',
  ];
  isSportUser: boolean = false;
  randomSRC: string = "";
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.sessionStorageService.removeItem('eventId');
    if(this.token !== '' && this.role === '1' ){
      this.isSportUser = true;
    }
    this.getAllEvents();
  }

  getAllEvents() {
    console.log("Get AllEvents")
    this.eventService.getAllEvents().subscribe(
      (response) => {
        console.log("Events catalog: ", response)
        this.events = response.content as SportEvent[];
        this.events.forEach(event => {
          event.src = this.getRandomImageSource();
        });
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the third catalog", "Error")
      }
    );
  }

  getRandomImageSource(): string {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomIndex = array[0] % this.allSources.length;
    return this.allSources[randomIndex];
  }

  goToEvent(event: SportEvent) {
    console.log("Event: ", event)
    this.sessionStorageService.setItem('eventId', event.id);
    this.router.navigate(['event-detail']);
  }


}
