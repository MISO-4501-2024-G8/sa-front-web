import { Component, OnInit } from '@angular/core';
import { MySessionService } from './my-session.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TrainingSession } from '../models/training_session';
import { SessionStorageService } from '../utils/session-storage.service';
import { SportSession } from '../models/sport_session';
import { SportEvent } from '../models/sport_event';
import { SportRoute } from '../models/sport_route';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-my-session',
  templateUrl: './my-session.component.html',
  styleUrls: ['./my-session.component.scss']
})
export class MySessionComponent implements OnInit {

  token: string = '';
  role: string = '';
  plan: string = '';
  id: string = '';
  name: string = '';
  sport: string = '';
  trainingSessions: SportSession[] = [];
  base_trainingSessions: SportSession[] = [];
  filterForm!: FormGroup;


  constructor(
    private mySessionService: MySessionService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.plan = this.sessionStorageService.getItem('typePlan') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.name = this.sessionStorageService.getItem('name') ?? '';
    this.sport = this.sessionStorageService.getItem('userSport') ?? '';
    this.getTrainingSessions();
    this.filterForm = this.formBuilder.group({
      initialDate: [''],
      finalDate: [''],
    });
  }

  getTrainingSessions() {
    // this.mySessionService.getTrainingSessionsByUserID(this.id).subscribe(
    //   (data) => {
    //     console.log(data);
    //     const trainingSessions: TrainingSession[] = data.content as TrainingSession[];
    //     trainingSessions.forEach((trainingSession) => {
    //       if (trainingSession.event_category === 'evento') {
    //         this.mySessionService.getEventByID(trainingSession.id_event).subscribe(
    //           (eventData) => {
    //             console.log(eventData);
    //             if (eventData.code === 200) {
    //               const event = eventData.content as SportEvent;
    //               const sportsession = new SportSession(trainingSession, event,null);
    //               this.base_trainingSessions.push(sportsession);
    //               this.resetTrainingSessions();
    //             }
    //           },
    //           (error) => {
    //             console.log(error);
    //             this.toastr.error('Error al obtener los eventos de las sesiones de entrenamiento', 'Error');
    //           }
    //         );
    //       }
    //       else if (trainingSession.event_category === 'ruta') {
    //         this.mySessionService.getRouteByID(trainingSession.id_event).subscribe(
    //           (routeData) => {
    //             console.log(routeData);
    //             if (routeData.code === 200) {
    //               const route = routeData.content as SportRoute;
    //               const sportsession = new SportSession(trainingSession, null,route);
    //               this.base_trainingSessions.push(sportsession);
    //               this.resetTrainingSessions();
    //             }
    //           },
    //           (error) => {
    //             console.log(error);
    //             this.toastr.error('Error al obtener las rutas de las sesiones de entrenamiento', 'Error');
    //           }
    //         );
    //       }
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error('Error al obtener las sesiones de entrenamiento', 'Error');
    //   }
    // );
    this.mySessionService.getTrainingSessionsByUserID(this.id).subscribe(
      (data) => {
        console.log(data);
        const trainingSessions: TrainingSession[] = data.content as TrainingSession[];
        if(trainingSessions.length == 0){
          this.toastr.info('No hay sesiones de entrenamiento', 'Información');
        }
        const requests = trainingSessions.map((trainingSession) => {
          if (trainingSession.event_category === 'evento') {
            return this.mySessionService.getEventByID(trainingSession.id_event).pipe(
              map((eventData) => {
                console.log(eventData);
                if (eventData.code === 200) {
                  const event = eventData.content as SportEvent;
                  const sportsession = new SportSession(trainingSession, event, null);
                  this.base_trainingSessions.push(sportsession);
                  this.resetTrainingSessions();
                }
              }),
              catchError((error) => {
                console.log(error);
                this.toastr.error('Error al obtener los eventos de las sesiones de entrenamiento', 'Error');
                return of(null);
              })
            );
          } else if (trainingSession.event_category === 'ruta') {
            return this.mySessionService.getRouteByID(trainingSession.id_event).pipe(
              map((routeData) => {
                console.log(routeData);
                if (routeData.code === 200) {
                  const route = routeData.content as SportRoute;
                  const sportsession = new SportSession(trainingSession, null, route);
                  this.base_trainingSessions.push(sportsession);
                  this.resetTrainingSessions();
                }
              }),
              catchError((error) => {
                console.log(error);
                this.toastr.error('Error al obtener las rutas de las sesiones de entrenamiento', 'Error');
                return of(null);
              })
            );
          }
          return of(null);
        });

        forkJoin(requests).subscribe(() => {
          console.log('All requests are completed');
          if(this.base_trainingSessions.length == 0){
            this.toastr.info('No hay sesiones de entrenamiento', 'Información');
          }
        });
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al obtener las sesiones de entrenamiento', 'Error');
      }
    );
  }

  resetTrainingSessions() {
    this.trainingSessions = this.base_trainingSessions;
  }

  deleteTrainingSession(id: string) {
    this.mySessionService.deleteTrainingSession(id).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Sesión de entrenamiento eliminada correctamente', 'Éxito');
        this.base_trainingSessions = this.base_trainingSessions.filter((trainingSession) => trainingSession.training_session.id !== id);
        this.trainingSessions = this.trainingSessions.filter((trainingSession) => trainingSession.training_session.id !== id);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error al eliminar la sesión de entrenamiento', 'Error');
      }
    );
  }

  filterTrainingSessions(): void {
    this.resetTrainingSessions();
    let initialDate = this.filterForm.value.initialDate;
    let finalDate = this.filterForm.value.finalDate;

    if (initialDate) {
      initialDate = new Date(initialDate + 'T00:00');
    }

    if (finalDate) {
      finalDate = new Date(finalDate + 'T00:00');
    }

    // Filter training sessions based on dates
    this.trainingSessions = this.trainingSessions.filter(session => {
      const sessionDate = new Date(session.training_session.session_date);
      sessionDate.setHours(0, 0, 0, 0);
      // Check if the initial date matches (if it's defined)
      const matchInitialDate = !initialDate || sessionDate >= initialDate;
      // Check if the final date matches (if it's defined)
      const matchFinalDate = !finalDate || sessionDate <= finalDate;
      // Return true if the session matches both conditions
      return matchInitialDate && matchFinalDate;
    });

    if (this.trainingSessions.length === 0) {
      this.toastr.info('No hay sesiones de entrenamiento programadas para las fechas indicadas', 'Información');
    }
  }

  clearFilter(): void {
    this.filterForm.reset(); // Limpiar valores del formulario
    this.resetTrainingSessions();
  }

  returnToSession() {
    this.router.navigate(['/session']);
  }

  infoTrainingSession(id: string) {
    let trainingSession = this.trainingSessions.filter((trainingSession) => trainingSession.training_session.id === id);
    let base_trainingSessions = this.base_trainingSessions.filter((trainingSession) => trainingSession.training_session.id === id);
    console.log(trainingSession);
  }

}
