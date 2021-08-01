import * as fs from "fs";
import * as path from "path";

import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { v4 as uuid } from "uuid";

import { AddMessageDto, ChatDto } from "./chat.dto";

@Controller("chat")
export class ChatController {
  chatMessages: ChatDto[];
  constructor() {
    this.chatMessages = [];

    const chatFile = path.join(__dirname, "../../data/chat.json");
    const data: string = fs.readFileSync(chatFile).toString();
    if (data && typeof data === "string" && data.length > 1) {
      this.chatMessages = JSON.parse(data);
      console.log(`Loaded ${this.chatMessages.length} chat messages`);
    }
  }

  @ApiOkResponse({ type: [ChatDto] })
  @Get("/all")
  getAllTags(): ChatDto[] {
    return this.chatMessages;
  }

  @ApiBody({ type: AddMessageDto })
  @ApiOkResponse({ type: ChatDto })
  @Post("/add")
  addTag(@Body() addMsg: AddMessageDto): ChatDto {
    if (!addMsg.senderName || !addMsg.message) throw new BadRequestException();
    const rec = {
      ...addMsg,
      id: uuid(),
      date: new Date().toISOString(),
    };
    this.chatMessages.push(rec);

    this._saveDB();

    return rec;
  }

  _saveDB() {
    const chatFile = path.join(__dirname, "../../data/chat.json");
    const jsonContent = JSON.stringify(this.chatMessages);

    fs.writeFileSync(chatFile, jsonContent);
  }
}
