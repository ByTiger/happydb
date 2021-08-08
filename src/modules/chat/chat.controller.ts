import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOkResponse } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

import { AuthGuard } from "src/utils/auth.guard";

import { ForumService } from "../forum/forum.service";

import { AddMessageDto, ChatDto } from "./chat.dto";
import { ChatService } from "./chat.service";

@Controller("chat")
@ApiHeader({ name: "X-User-Name", description: "User name" })
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private forumService: ForumService, private chatService: ChatService) {}

  @ApiOkResponse({ type: [ChatDto] })
  @Get("/all/:forumId")
  getAllTags(@Param("forumId") forumId: string): ChatDto[] {
    const forum_id = parseInt(forumId, 10);
    if (!Number.isInteger(forum_id)) throw new BadRequestException();

    const forum = this.forumService.getForumInfo(forum_id);
    if (!forum) throw new BadRequestException();

    return this.chatService.getAll().filter(rec => rec.forumId === forum_id);
  }

  @ApiBody({ type: AddMessageDto })
  @ApiOkResponse({ type: ChatDto })
  @Post("/add")
  addTag(@Body() addMsg: AddMessageDto, @Req() req: any): ChatDto {
    if (!addMsg.forumId || !addMsg.message) throw new BadRequestException();

    const forum = this.forumService.getForumInfo(addMsg.forumId);
    if (!forum) throw new BadRequestException();
    forum.replies++;

    const rec = {
      ...addMsg,
      senderName: req.userName,
      id: uuid(),
      date: new Date().toISOString(),
    };
    this.chatService.getAll().push(rec);

    this.chatService.saveDB();
    this.forumService.saveDB();

    return rec;
  }
}
