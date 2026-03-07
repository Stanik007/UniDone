import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/vue';

posthog.init('phc_UsrsSaXVaec74nykYAQxLJ1YHvBhYCNqKBNQiFiWDKT', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
});

const app = createApp(App);

Sentry.init({
  app,
  dsn: 'https://7306cfa347ec63239b1d08de617284a5@o4511003597837952.ingest.de.sentry.io/4511003597930576',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: 'production',
});

app.mount('#app');
