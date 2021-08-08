import { Module } from "@nestjs/common";

import { ForumController } from "./forum.controller";
import { ForumService } from "./forum.service";

@Module({
  providers: [ForumService],
  controllers: [ForumController],
  exports: [ForumService],
})
export class ForumModule {}
