/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

import { StravaService } from './strava.service';
import { StravaComponent } from './strava.component';
import { SessionStorageService } from '../utils/session-storage.service';


function asyncData<T>(data: T) {
  return of(data).pipe(delay(0));
}

describe('Service: Strava', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StravaService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([StravaService], (service: StravaService) => {
    expect(service).toBeTruthy();
  }));
});

describe('Third Component', async () => {
  let component: StravaComponent;
  let fixture: ComponentFixture<StravaComponent>;
  let mockService: jasmine.SpyObj<StravaService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let location: Location;


  beforeEach(async () => {
    mockService = jasmine.createSpyObj(['isUserActive', 'getAthleteData', 'syncAthleteData', 'getAthleteActivities']);
    mockToastrService = jasmine.createSpyObj(['success', 'error', 'clear', 'show', 'info']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'removeItem', 'setItem']);
    (mockSessionStorageService.getItem as jasmine.Spy).and.returnValue('1');

    TestBed.configureTestingModule({
      declarations: [StravaComponent],
      providers: [
        { provide: StravaService, useValue: mockService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        Location
      ]
    });

    const activeUserResponse: any = {
      "message": "OK",
      "code": 200,
      "strava_user": {
        "id": "d4c3d0a1",
        "user_id": "e2f75148",
        "athlete_id": "136490537",
        "code": "2e18b72b72837564c13df199a91ce1a0f855b6e5",
        "scope": "read,activity:write,activity:read_all",
        "access_token": "1da85fdfef14646bc6248420f98ac9778068c13a",
        "refresh_token": "f38d17174fd496ec8a9e0d3d145ed44dbae1d95f",
        "timestamp": 1714800196,
        "last_sync": "2024-05-03 20:56:19",
        "expiration_token": "2024-05-04T05:23:16",
        "createdAt": "2024-05-03T19:39:33.244338",
        "updatedAt": "2024-05-03T19:39:33.244340"
      }
    };

    const getAthleteDataResponse: any = {
      "message": "OK",
      "code": 200,
      "athlete": {
        "id": 136490537,
        "username": null,
        "resource_state": 2,
        "firstname": "Juan",
        "lastname": "Sanchez",
        "bio": null,
        "city": "Bogotá",
        "state": "Bogotá",
        "country": "Colombia",
        "sex": "M",
        "premium": false,
        "summit": false,
        "created_at": "2024-04-30T19:20:50Z",
        "updated_at": "2024-05-04T00:39:29Z",
        "badge_type_id": 0,
        "weight": null,
        "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/136490537/31060509/1/medium.jpg",
        "profile": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/136490537/31060509/1/large.jpg",
        "friend": null,
        "follower": null
      }
    };
    const syncAthleteDataResponse: any = {
      "message": "OK Sync",
      "code": 200,
      "activities": [
        {
          "resource_state": 2,
          "athlete": {
            "id": 136490537,
            "resource_state": 1
          },
          "name": "activity test 3",
          "distance": 0.0,
          "moving_time": 18373,
          "elapsed_time": 18373,
          "total_elevation_gain": 0,
          "type": "Run",
          "sport_type": "Run",
          "workout_type": null,
          "id": 11325714941,
          "start_date": "2024-05-02T23:03:13Z",
          "start_date_local": "2024-05-02T18:03:13Z",
          "timezone": "(GMT-05:00) America/Bogota",
          "utc_offset": -18000.0,
          "location_city": null,
          "location_state": null,
          "location_country": "Colombia",
          "achievement_count": 0,
          "kudos_count": 0,
          "comment_count": 0,
          "athlete_count": 1,
          "photo_count": 0,
          "map": {
            "id": "a11325714941",
            "summary_polyline": "",
            "resource_state": 2
          },
          "trainer": false,
          "commute": false,
          "manual": true,
          "private": false,
          "visibility": "everyone",
          "flagged": false,
          "gear_id": null,
          "start_latlng": [],
          "end_latlng": [],
          "average_speed": 0.0,
          "max_speed": 0,
          "has_heartrate": false,
          "heartrate_opt_out": false,
          "display_hide_heartrate_option": false,
          "upload_id": null,
          "external_id": null,
          "from_accepted_tag": false,
          "pr_count": 0,
          "total_photo_count": 0,
          "has_kudoed": false
        },
        {
          "resource_state": 2,
          "athlete": {
            "id": 136490537,
            "resource_state": 1
          },
          "name": "activity test 2",
          "distance": 0.0,
          "moving_time": 18373,
          "elapsed_time": 18373,
          "total_elevation_gain": 0,
          "type": "Run",
          "sport_type": "Run",
          "workout_type": null,
          "id": 11312655247,
          "start_date": "2024-05-02T23:02:13Z",
          "start_date_local": "2024-05-02T18:02:13Z",
          "timezone": "(GMT-05:00) America/Bogota",
          "utc_offset": -18000.0,
          "location_city": null,
          "location_state": null,
          "location_country": "Colombia",
          "achievement_count": 0,
          "kudos_count": 0,
          "comment_count": 0,
          "athlete_count": 1,
          "photo_count": 0,
          "map": {
            "id": "a11312655247",
            "summary_polyline": "",
            "resource_state": 2
          },
          "trainer": false,
          "commute": false,
          "manual": true,
          "private": false,
          "visibility": "everyone",
          "flagged": false,
          "gear_id": null,
          "start_latlng": [],
          "end_latlng": [],
          "average_speed": 0.0,
          "max_speed": 0,
          "has_heartrate": false,
          "heartrate_opt_out": false,
          "display_hide_heartrate_option": false,
          "upload_id": null,
          "external_id": null,
          "from_accepted_tag": false,
          "pr_count": 0,
          "total_photo_count": 0,
          "has_kudoed": false
        }
      ]
    };
    const getAthleteActivitiesResponse: any = {
      "message": "OK",
      "code": 200,
      "activities": [
        {
          "resource_state": 2,
          "athlete": {
            "id": 136490537,
            "resource_state": 1
          },
          "name": "activity test 3",
          "distance": 0.0,
          "moving_time": 18373,
          "elapsed_time": 18373,
          "total_elevation_gain": 0,
          "type": "Run",
          "sport_type": "Run",
          "workout_type": null,
          "id": 11325714941,
          "start_date": "2024-05-02T23:03:13Z",
          "start_date_local": "2024-05-02T18:03:13Z",
          "timezone": "(GMT-05:00) America/Bogota",
          "utc_offset": -18000.0,
          "location_city": null,
          "location_state": null,
          "location_country": "Colombia",
          "achievement_count": 0,
          "kudos_count": 0,
          "comment_count": 0,
          "athlete_count": 1,
          "photo_count": 0,
          "map": {
            "id": "a11325714941",
            "summary_polyline": "",
            "resource_state": 2
          },
          "trainer": false,
          "commute": false,
          "manual": true,
          "private": false,
          "visibility": "everyone",
          "flagged": false,
          "gear_id": null,
          "start_latlng": [],
          "end_latlng": [],
          "average_speed": 0.0,
          "max_speed": 0,
          "has_heartrate": false,
          "heartrate_opt_out": false,
          "display_hide_heartrate_option": false,
          "upload_id": null,
          "external_id": null,
          "from_accepted_tag": false,
          "pr_count": 0,
          "total_photo_count": 0,
          "has_kudoed": false
        },
        {
          "resource_state": 2,
          "athlete": {
            "id": 136490537,
            "resource_state": 1
          },
          "name": "activity test 2",
          "distance": 0.0,
          "moving_time": 18373,
          "elapsed_time": 18373,
          "total_elevation_gain": 0,
          "type": "Run",
          "sport_type": "Run",
          "workout_type": null,
          "id": 11312655247,
          "start_date": "2024-05-02T23:02:13Z",
          "start_date_local": "2024-05-02T18:02:13Z",
          "timezone": "(GMT-05:00) America/Bogota",
          "utc_offset": -18000.0,
          "location_city": null,
          "location_state": null,
          "location_country": "Colombia",
          "achievement_count": 0,
          "kudos_count": 0,
          "comment_count": 0,
          "athlete_count": 1,
          "photo_count": 0,
          "map": {
            "id": "a11312655247",
            "summary_polyline": "",
            "resource_state": 2
          },
          "trainer": false,
          "commute": false,
          "manual": true,
          "private": false,
          "visibility": "everyone",
          "flagged": false,
          "gear_id": null,
          "start_latlng": [],
          "end_latlng": [],
          "average_speed": 0.0,
          "max_speed": 0,
          "has_heartrate": false,
          "heartrate_opt_out": false,
          "display_hide_heartrate_option": false,
          "upload_id": null,
          "external_id": null,
          "from_accepted_tag": false,
          "pr_count": 0,
          "total_photo_count": 0,
          "has_kudoed": false
        }
      ]
    };
    mockService.isUserActive.and.returnValue(asyncData(activeUserResponse));
    mockService.getAthleteData.and.returnValue(asyncData(getAthleteDataResponse));
    mockService.syncAthleteData.and.returnValue(asyncData(syncAthleteDataResponse));
    mockService.getAthleteActivities.and.returnValue(asyncData(getAthleteActivitiesResponse));
    fixture = TestBed.createComponent(StravaComponent);
    component = fixture.componentInstance;
    await fixture.detectChanges();
  });

  it('should initialize the component', async () => {
    await component.ngOnInit();
  });

  it('should get strava data', async () => {
    await component.getStravaData();
  });

  it('should go to profile', async () => {
    await component.goToProfile();
  });

  it('should go to sprofile', async () => {
    await component.goToSProfile();
  });

  it('should go to activity', async () => {
    await component.goToActivity(123);
  });

  it('should syncData', async () => {
    await component.syncData();
  });

  it('should get strava data', async () => {
    let getAthleteActivitiesResponse: any = {
      "message": "OK",
      "code": 200,
      "activities": []
    };
    mockService.getAthleteActivities.and.returnValue(asyncData(getAthleteActivitiesResponse));
    await component.getStravaData();
    getAthleteActivitiesResponse = {
      "message": "Error",
      "code": 400,
      "error": "Error"
    };
    mockService.getAthleteActivities.and.returnValue(asyncData(getAthleteActivitiesResponse));

    await component.getStravaData();
    const getAthleteDataResponse: any = {
      "message": "Error",
      "code": 400,
      "error": "Error"
    };
    mockService.getAthleteData.and.returnValue(asyncData(getAthleteDataResponse));
    await component.getStravaData();
  });

  it('should syncData', async () => {
    const syncAthleteDataResponse: any = {
      "message": "OK Sync",
      "code": 400,
      "error": "Error"
    };
    mockService.syncAthleteData.and.returnValue(asyncData(syncAthleteDataResponse));
    await component.syncData();
  });

});

describe('ThirdProductService', () => {
  let service: StravaService;
  let httpMock: HttpTestingController;

  const activeUserResponse: any = {
    "message": "OK",
    "code": 200,
    "strava_user": {
      "id": "d4c3d0a1",
      "user_id": "e2f75148",
      "athlete_id": "136490537",
      "code": "2e18b72b72837564c13df199a91ce1a0f855b6e5",
      "scope": "read,activity:write,activity:read_all",
      "access_token": "1da85fdfef14646bc6248420f98ac9778068c13a",
      "refresh_token": "f38d17174fd496ec8a9e0d3d145ed44dbae1d95f",
      "timestamp": 1714800196,
      "last_sync": "2024-05-03 20:56:19",
      "expiration_token": "2024-05-04T05:23:16",
      "createdAt": "2024-05-03T19:39:33.244338",
      "updatedAt": "2024-05-03T19:39:33.244340"
    }
  };

  const getAthleteDataResponse: any = {
    "message": "OK",
    "code": 200,
    "athlete": {
      "id": 136490537,
      "username": null,
      "resource_state": 2,
      "firstname": "Juan",
      "lastname": "Sanchez",
      "bio": null,
      "city": "Bogotá",
      "state": "Bogotá",
      "country": "Colombia",
      "sex": "M",
      "premium": false,
      "summit": false,
      "created_at": "2024-04-30T19:20:50Z",
      "updated_at": "2024-05-04T00:39:29Z",
      "badge_type_id": 0,
      "weight": null,
      "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/136490537/31060509/1/medium.jpg",
      "profile": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/136490537/31060509/1/large.jpg",
      "friend": null,
      "follower": null
    }
  };
  const syncAthleteDataResponse: any = {
    "message": "OK Sync",
    "code": 200,
    "activities": [
      {
        "resource_state": 2,
        "athlete": {
          "id": 136490537,
          "resource_state": 1
        },
        "name": "activity test 3",
        "distance": 0.0,
        "moving_time": 18373,
        "elapsed_time": 18373,
        "total_elevation_gain": 0,
        "type": "Run",
        "sport_type": "Run",
        "workout_type": null,
        "id": 11325714941,
        "start_date": "2024-05-02T23:03:13Z",
        "start_date_local": "2024-05-02T18:03:13Z",
        "timezone": "(GMT-05:00) America/Bogota",
        "utc_offset": -18000.0,
        "location_city": null,
        "location_state": null,
        "location_country": "Colombia",
        "achievement_count": 0,
        "kudos_count": 0,
        "comment_count": 0,
        "athlete_count": 1,
        "photo_count": 0,
        "map": {
          "id": "a11325714941",
          "summary_polyline": "",
          "resource_state": 2
        },
        "trainer": false,
        "commute": false,
        "manual": true,
        "private": false,
        "visibility": "everyone",
        "flagged": false,
        "gear_id": null,
        "start_latlng": [],
        "end_latlng": [],
        "average_speed": 0.0,
        "max_speed": 0,
        "has_heartrate": false,
        "heartrate_opt_out": false,
        "display_hide_heartrate_option": false,
        "upload_id": null,
        "external_id": null,
        "from_accepted_tag": false,
        "pr_count": 0,
        "total_photo_count": 0,
        "has_kudoed": false
      },
      {
        "resource_state": 2,
        "athlete": {
          "id": 136490537,
          "resource_state": 1
        },
        "name": "activity test 2",
        "distance": 0.0,
        "moving_time": 18373,
        "elapsed_time": 18373,
        "total_elevation_gain": 0,
        "type": "Run",
        "sport_type": "Run",
        "workout_type": null,
        "id": 11312655247,
        "start_date": "2024-05-02T23:02:13Z",
        "start_date_local": "2024-05-02T18:02:13Z",
        "timezone": "(GMT-05:00) America/Bogota",
        "utc_offset": -18000.0,
        "location_city": null,
        "location_state": null,
        "location_country": "Colombia",
        "achievement_count": 0,
        "kudos_count": 0,
        "comment_count": 0,
        "athlete_count": 1,
        "photo_count": 0,
        "map": {
          "id": "a11312655247",
          "summary_polyline": "",
          "resource_state": 2
        },
        "trainer": false,
        "commute": false,
        "manual": true,
        "private": false,
        "visibility": "everyone",
        "flagged": false,
        "gear_id": null,
        "start_latlng": [],
        "end_latlng": [],
        "average_speed": 0.0,
        "max_speed": 0,
        "has_heartrate": false,
        "heartrate_opt_out": false,
        "display_hide_heartrate_option": false,
        "upload_id": null,
        "external_id": null,
        "from_accepted_tag": false,
        "pr_count": 0,
        "total_photo_count": 0,
        "has_kudoed": false
      }
    ]
  };
  const getAthleteActivitiesResponse: any = {
    "message": "OK",
    "code": 200,
    "activities": [
      {
        "resource_state": 2,
        "athlete": {
          "id": 136490537,
          "resource_state": 1
        },
        "name": "activity test 3",
        "distance": 0.0,
        "moving_time": 18373,
        "elapsed_time": 18373,
        "total_elevation_gain": 0,
        "type": "Run",
        "sport_type": "Run",
        "workout_type": null,
        "id": 11325714941,
        "start_date": "2024-05-02T23:03:13Z",
        "start_date_local": "2024-05-02T18:03:13Z",
        "timezone": "(GMT-05:00) America/Bogota",
        "utc_offset": -18000.0,
        "location_city": null,
        "location_state": null,
        "location_country": "Colombia",
        "achievement_count": 0,
        "kudos_count": 0,
        "comment_count": 0,
        "athlete_count": 1,
        "photo_count": 0,
        "map": {
          "id": "a11325714941",
          "summary_polyline": "",
          "resource_state": 2
        },
        "trainer": false,
        "commute": false,
        "manual": true,
        "private": false,
        "visibility": "everyone",
        "flagged": false,
        "gear_id": null,
        "start_latlng": [],
        "end_latlng": [],
        "average_speed": 0.0,
        "max_speed": 0,
        "has_heartrate": false,
        "heartrate_opt_out": false,
        "display_hide_heartrate_option": false,
        "upload_id": null,
        "external_id": null,
        "from_accepted_tag": false,
        "pr_count": 0,
        "total_photo_count": 0,
        "has_kudoed": false
      },
      {
        "resource_state": 2,
        "athlete": {
          "id": 136490537,
          "resource_state": 1
        },
        "name": "activity test 2",
        "distance": 0.0,
        "moving_time": 18373,
        "elapsed_time": 18373,
        "total_elevation_gain": 0,
        "type": "Run",
        "sport_type": "Run",
        "workout_type": null,
        "id": 11312655247,
        "start_date": "2024-05-02T23:02:13Z",
        "start_date_local": "2024-05-02T18:02:13Z",
        "timezone": "(GMT-05:00) America/Bogota",
        "utc_offset": -18000.0,
        "location_city": null,
        "location_state": null,
        "location_country": "Colombia",
        "achievement_count": 0,
        "kudos_count": 0,
        "comment_count": 0,
        "athlete_count": 1,
        "photo_count": 0,
        "map": {
          "id": "a11312655247",
          "summary_polyline": "",
          "resource_state": 2
        },
        "trainer": false,
        "commute": false,
        "manual": true,
        "private": false,
        "visibility": "everyone",
        "flagged": false,
        "gear_id": null,
        "start_latlng": [],
        "end_latlng": [],
        "average_speed": 0.0,
        "max_speed": 0,
        "has_heartrate": false,
        "heartrate_opt_out": false,
        "display_hide_heartrate_option": false,
        "upload_id": null,
        "external_id": null,
        "from_accepted_tag": false,
        "pr_count": 0,
        "total_photo_count": 0,
        "has_kudoed": false
      }
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StravaService]
    });

    service = TestBed.get(StravaService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should isUserActive', () => {
    service.isUserActive('1').subscribe(response => {
      expect(response).toEqual(activeUserResponse);
    });
    const req = httpMock.expectOne(`${environment.workout_manager_url}active_user?user_id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(activeUserResponse); // Provide the mockResponse as the response
  });

  it('should getAthleteData', () => {
    service.getAthleteData('1').subscribe(response => {
      expect(response).toEqual(getAthleteDataResponse);
    });
    const req = httpMock.expectOne(`${environment.workout_manager_url}strava_athlete?user_id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(getAthleteDataResponse); // Provide the mockResponse as the response
  });

  it('should syncAthleteData', () => {
    service.syncAthleteData('1').subscribe(response => {
      expect(response).toEqual(syncAthleteDataResponse);
    });
    const req = httpMock.expectOne(`${environment.workout_manager_url}sync_activities?user_id=1`);
    expect(req.request.method).toBe('POST');
    req.flush(syncAthleteDataResponse); // Provide the mockResponse as the response
  });

  it('should getAthleteActivities', () => {
    service.getAthleteActivities('1').subscribe(response => {
      expect(response).toEqual(getAthleteActivitiesResponse);
    });
    const req = httpMock.expectOne(`${environment.workout_manager_url}strava_activities?user_id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(getAthleteActivitiesResponse); // Provide the mockResponse as the response
  });

});
