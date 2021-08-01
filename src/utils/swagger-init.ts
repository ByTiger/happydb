import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerInit = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("PractDB example")
    .setDescription("Use it for free till I got angry")
    .setVersion("1.0")
    .addTag("practdb")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);
};
