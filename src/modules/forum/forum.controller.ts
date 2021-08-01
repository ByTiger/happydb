import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

import * as data from "../../data/forum-list.json";

import { ForumDto } from "./forum.dto";

@Controller("forum")
export class ForumController {
  @ApiOkResponse({ type: [ForumDto] })
  @Get("/all")
  getAllTags(): ForumDto[] {
    return data;
  }
}
