import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerInit = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("HappyDB example")
    .setDescription("Use it for free till I got angry")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);
};
