import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { DateRangeType, IgxCalendarComponent } from 'igniteui-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SEvent } from '../models/sevent';
import { SportSessionService } from './sport-session.service';

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
  base_cards: SEvent[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private http: HttpClient,
    private sportSessionService: SportSessionService
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
    this.getCardsContent();
  }


  getCardsContent(): void {
    this.sportSessionService.getCombinedData().subscribe(([events, routes]) => {
      const session_cards: SEvent[] = [];
      // Se debe consultar el servicio de Planes de Entrenamiento por id de usuario
      console.log('Training Plans:');
      console.log('Events:', events);
      console.log('Routes:', routes);
      if(events.code === 200 && events.content) {
        console.log('Events:', events.content);
        events.content.forEach((event: any) => {
          let img = '';
          if(event.sport === 'Ciclismo') {
            img = "../../assets/sport-session.jpeg";
          }else if(event.sport === 'Atletismo') {
            img = "../../assets/runing-session.jpeg";
          }else{
            img = "../../assets/training-session.jpeg";
          }
          const card: SEvent = {
            imageUrl: img,
            id: event.id,
            event_name: event.event_name,
            event_description: event.event_description,
            event_location: event.event_location,
            event_type: event.event_type,
            event_date: event.event_date.replace('T', ' ').substring(0, 10),
            map_link: null,
            sport: event.sport,
            link: event.link,
            type: 'event',
          };
          session_cards.push(card);
        });
      }
      if(routes.code === 200 && routes.content) {
        console.log('Routes:', routes.content);
        routes.content.forEach((route: any) => {
          let map_link = '';
          let img = '';
          if(route.sport === 'Ciclismo') {
            img = "../../assets/sport-session.jpeg";
            map_link = `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${route.route_latlon_A.replace(' ','')}&destination=${route.route_latlon_B.replace(' ','')}`;
            //map_link = `https://www.google.com/maps/dir/?api=1&travelmode=bicycling&origin=${route.route_latlon_A.replace(' ','')}&destination=${route.route_latlon_B.replace(' ','')}`;
          }else if(route.sport === 'Atletismo') {
            img = "../../assets/runing-session.jpeg";
            map_link = `https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${route.route_latlon_A.replace(' ','')}&destination=${route.route_latlon_B.replace(' ','')}`;
          } else {
            img = "../../assets/training-session.jpeg";
          }
          const card: SEvent = {
            imageUrl: img,
            id: route.id,
            event_name: route.route_name,
            event_description: route.route_description,
            event_location: route.route_location_A + ' - ' + route.route_location_B,
            event_type: route.route_type,
            event_date: route.route_date.replace('T', ' ').substring(0, 10),
            map_link: map_link,
            sport: route.sport,
            link: route.link,
            type: 'route',
          };
          session_cards.push(card);
        });
      }
      this.base_cards = session_cards;
      this.resetCards();
    });
  }

  resetCards(): void {
    this.cards = this.base_cards;
  }

  onSelection(e: any) {
    console.log(typeof e);
    const dateSelected = new Date(e);
    console.log(dateSelected.toISOString().substring(0, 10));
    this.dateSelected = dateSelected.toISOString().substring(0, 10);
    this.filterCards();
  }

  setSessionType(type: string): void {
    this.sessionType = type;
    this.filterCards();
  }

  setSportType(type: string): void {
    this.sportType = type;
    this.filterCards();
  }

  cancelAction(): void {
    this.router.navigate(['/session']);
  }

  filterCards(): void {
    this.resetCards();
    console.log('Filtering cards...');
    console.log('Session Type:', this.sessionType);
    console.log('Sport Type:', this.sportType);
    console.log('Date Selected:', this.dateSelected);
    console.log('Cards:', this.cards);
    const filteredCards: SEvent[] = [];
    this.cards.forEach((card) => {
      if(this.sessionType !== '' && card.event_type !== this.sessionType) {
        return;
      }
      if(this.sportType !== '' && card.sport !== this.sportType) {
        return;
      }
      if(this.dateSelected !== '' && card.event_date !== this.dateSelected) {
        return;
      }
      filteredCards.push(card);
    });
    this.cards = filteredCards;
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
    this.resetCards();
    const listCards = document.querySelector('.list-cards');
    if (listCards) {
      listCards.scrollTo({
        top: 0,
        behavior: 'smooth' // Hace que el desplazamiento sea suave
      });
    }

  }

}
