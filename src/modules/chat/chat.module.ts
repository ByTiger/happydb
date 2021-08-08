import { Module } from "@nestjs/common";

import { ForumModule } from "../forum/forum.module";

import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
  imports: [ForumModule],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
