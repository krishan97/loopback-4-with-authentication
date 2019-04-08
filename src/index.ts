import {MyAppApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {MyAppApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new MyAppApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/explorer`);

  return app;
}
