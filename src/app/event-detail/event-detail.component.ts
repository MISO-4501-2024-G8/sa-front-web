import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { EventDetailService } from './event-detail.service';
import { SportEvent } from '../models/sport_event';
import { TrainingSession } from '../models/training_session';
import { get } from 'http';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = ''
  eventId: string = '';
  evento:SportEvent = {} as SportEvent;
  trainingSessions: TrainingSession[] = [];
  isSportUser: boolean = false;

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
  randomSRC: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private eventDetailService: EventDetailService
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.eventId = this.sessionStorageService.getItem('eventId') ?? '';
    this.randomSRC = this.sessionStorageService.getItem('eventSrc') ?? this.getRandomImageSource();
    if(this.token !== '' && this.role === '1' ){
      this.isSportUser = true;
    }
    this.getEventDetail();
    this.getTrainingSessions();
  }

  getEventDetail(){
    this.eventDetailService.getEventDetail(this.eventId).subscribe(
      (response) => {
        console.log("Event detail: ", response)
        this.evento = response.content as SportEvent;
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the event detail", "Error")
      }
    )
  }

  getTrainingSessions() {
    this.eventDetailService.getTrainingSessionsByUserID(this.id).subscribe(
      (response) => {
        console.log(response);
        this.trainingSessions= response.content as TrainingSession[];
      }
    );
  }


  getRandomImageSource(): string {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomIndex = array[0] % this.allSources.length;
    return this.allSources[randomIndex];
  }

  goEvents() {
    this.router.navigate(['/event']);
  }

  createTrainingSessions(event:SportEvent): void {
    console.log("Create training sessions")
    if(this.trainingSessions.some((session) => session.id_event === event.id)){
      this.toastr.info("Ya tienes esta sesion de entrenamiento programada para este evento", "Information")
      return;
    }
    const session = {
      id_sport_user: this.id,
      id_event: event.id,
      event_category: "evento",
      sport_type:event.sport,
      session_date: event.event_date.replace("T", " "),
    };
    console.log('Creating Session:', session);
    this.eventDetailService.createTrainingSession(session).subscribe(
      (response) => {
        console.log("Training session created: ", response)
        this.toastr.success("Sesion de entrenamiento creada satisfactoriamente", "Success")
        this.router.navigate(['/event']);
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("Un error ocurrio tratando de crear la sesion de entrenamiento", "Error")
      }
    );
  }

}
