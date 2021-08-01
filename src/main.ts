import { NestFactory } from "@nestjs/core";

import * as env from "../env.json";

import { swaggerInit } from "./utils/swagger-init";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  swaggerInit(app);
  await app.listen(env.port);
}
bootstrap();
console.log(`Starting server on port: ${env.port}`);
