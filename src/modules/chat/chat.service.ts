import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { ChatDto, ChatEntity } from "./chat.dto";

const charDataFileName = join(__dirname, "../../data/chat.json");

@Injectable()
export class ChatService {
  chatMessages: ChatEntity[];

  constructor() {
    this.chatMessages = [];

    const data: string = fs.readFileSync(charDataFileName).toString();
    if (data && typeof data === "string" && data.length > 1) {
      this.chatMessages = JSON.parse(data);
      console.log(`Loaded ${this.chatMessages.length} chat messages`);
    }
  }

  getAll(): ChatDto[] {
    return this.chatMessages;
  }

  saveDB() {
    const jsonContent = JSON.stringify(this.chatMessages);
    fs.writeFileSync(charDataFileName, jsonContent);
  }
}
