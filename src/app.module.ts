import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import { ChatModule } from "./modules/chat/chat.module";
import { ForumModule } from "./modules/forum/forum.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../static"),
      serveStaticOptions: {
        index: false,
      },
    }),
    ForumModule,
    ChatModule,
  ],
})
export class AppModule {}
