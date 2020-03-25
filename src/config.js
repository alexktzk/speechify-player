export default {
  GOOGLE_API_CREDENTIALS: {
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
  API_URL: process.env.REACT_APP_API_URL
}
