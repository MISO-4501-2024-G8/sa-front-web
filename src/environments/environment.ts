// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = 'https://g7o4mxf762.execute-api.us-east-1.amazonaws.com/prod/';
const strava_redirect_uri = 'http://lb-ms-py-workout-mngr-1790601522.us-east-1.elb.amazonaws.com/auth_callback/';
const workout_manager_url = 'http://lb-ms-py-workout-mngr-1790601522.us-east-1.elb.amazonaws.com/';

export const environment = {
  production: false,
  baseUrl,
  strava_redirect_uri,
  workout_manager_url,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
