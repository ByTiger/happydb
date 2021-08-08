import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { ForumEntity } from "./forum.dto";

const forumDataFileName = join(__dirname, "../../data/forum-list.json");

@Injectable()
export class ForumService {
  forumList: ForumEntity[];

  constructor() {
    this.forumList = [];

    const data: string = fs.readFileSync(forumDataFileName).toString();
    if (data && typeof data === "string" && data.length > 1) {
      this.forumList = JSON.parse(data);
      console.log(`Loaded ${this.forumList.length} forums`);
    }
  }

  getAll(): ForumEntity[] {
    return this.forumList;
  }

  getForumInfo(id: number) {
    return this.forumList.find(rec => rec.id === id);
  }

  saveDB() {
    const jsonContent = JSON.stringify(this.forumList);

    fs.writeFileSync(forumDataFileName, jsonContent);
  }
}
