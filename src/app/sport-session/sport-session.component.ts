import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { DateRangeType, IgxCalendarComponent } from 'igniteui-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SEvent } from '../models/sevent';

@Component({
  selector: 'app-sport-session',
  templateUrl: './sport-session.component.html',
  styleUrls: ['./sport-session.component.scss']
})
export class SportSessionComponent implements OnInit {

  @ViewChild(IgxCalendarComponent, { static: false }) calendar!: IgxCalendarComponent;
  token: string = '';
  role: string = '';
  plan: string = '';
  id: string = '';
  name: string = '';
  sport: string = '';
  locale: string = 'es';
  formatViews: any = { day: true, month: true, year: true };
  formatOptions: any = { day: '2-digit', month: 'long', weekday: 'short', year: 'numeric' };
  disabledDates: any = [];
  style: any = {};
  sessionType: string = '';
  sportType: string = '';
  dateSelected: string = '';
  cards: SEvent[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.plan = this.sessionStorageService.getItem('typePlan') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.name = this.sessionStorageService.getItem('name') ?? '';
    this.sport = this.sessionStorageService.getItem('userSport') ?? '';
    let today = new Date(Date.now());
    let range = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    ];
    this.disabledDates = [{ type: DateRangeType.Before, dateRange: range }];
    this.cards = [
      {
        "imageUrl": "../../assets/sport-session.jpeg",
        "id": "59785783",
        "event_name": "ciclismo 10k",
        "event_description": "Ruta de ciclismo 10K",
        "event_location": "Bogota",
        "event_type": "virtual",
        "sport": "Ciclismo",
        "link": "http://linkreu.edu",
      },
      {
        "imageUrl": "../../assets/sport-session.jpeg",
        "id": "59785783",
        "event_name": "ciclismo 10k",
        "event_description": "Ruta de ciclismo 10K",
        "event_location": "Bogota",
        "event_type": "virtual",
        "sport": "Ciclismo",
        "link": "http://linkreu.edu",
      },
      {
        "imageUrl": "../../assets/sport-session.jpeg",
        "id": "59785783",
        "event_name": "ciclismo 10k",
        "event_description": "Ruta de ciclismo 10K",
        "event_location": "Bogota",
        "event_type": "virtual",
        "sport": "Ciclismo",
        "link": "http://linkreu.edu",
      }
    ];
  }

  onSelection(e: any) {
    console.log(typeof e);
    const dateSelected = new Date(e);
    console.log(dateSelected.toISOString().substring(0, 10));
    this.dateSelected = dateSelected.toISOString().substring(0, 10);;
  }

  setSessionType(type: string): void {
    this.sessionType = type;
  }

  setSportType(type: string): void {
    this.sportType = type;
  }

  cancelAction(): void {
    this.router.navigate(['/session']);
  }

  limpiarFiltros(): void {
    this.sessionType = '';
    this.sportType = '';
    this.dateSelected = '';
    const virtualOutlined = document.getElementById('virtual-outlined') as HTMLInputElement;
    if (virtualOutlined) {
      virtualOutlined.checked = false;
    }

    const presencialOutlined = document.getElementById('presencial-outlined') as HTMLInputElement;
    if (presencialOutlined) {
      presencialOutlined.checked = false;
    }

    const atletismoOutlined = document.getElementById('atletismo-outlined') as HTMLInputElement;
    if (atletismoOutlined) {
      atletismoOutlined.checked = false;
    }

    const ciclismoOutlined = document.getElementById('ciclismo-outlined') as HTMLInputElement;
    if (ciclismoOutlined) {
      ciclismoOutlined.checked = false;
    }
    if (this.calendar) {
      this.calendar.deselectDate();
    }
  }

}
