const baseUrl = 'https://g7o4mxf762.execute-api.us-east-1.amazonaws.com/prod/';
const strava_redirect_uri = 'http://lb-ms-py-workout-mngr-1790601522.us-east-1.elb.amazonaws.com/auth_callback/';
const workout_manager_url = 'http://lb-ms-py-workout-mngr-1790601522.us-east-1.elb.amazonaws.com/';

export const environment = {
  production: false,
  baseUrl,
  strava_redirect_uri,
  workout_manager_url,
};

