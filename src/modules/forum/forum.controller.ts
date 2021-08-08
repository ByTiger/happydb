import { BadRequestException, Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOkResponse } from "@nestjs/swagger";

import { AuthGuard } from "src/utils/auth.guard";

import { ForumDto } from "./forum.dto";
import { ForumService } from "./forum.service";

@Controller("forum")
@ApiHeader({ name: "X-User-Name", description: "User name" })
@UseGuards(AuthGuard)
export class ForumController {
  constructor(private forumService: ForumService) {}

  @ApiOkResponse({ type: [ForumDto] })
  @Get("/all")
  getAllTags(@Req() req: any): ForumDto[] {
    return this.forumService.getAll().map(rec => ({
      ...rec,
      like: rec.likes.indexOf(req.userName) >= 0,
      likes: undefined,
    }));
  }

  @ApiOkResponse({ type: ForumDto })
  @Get("/like/:id")
  like(@Param("id") id: string, @Req() req: any): ForumDto {
    const forum_id = parseInt(id, 10);
    if (!Number.isInteger(forum_id)) throw new BadRequestException();

    const forum = this.forumService.getForumInfo(forum_id);
    if (!forum) throw new BadRequestException();

    const user = req.userName;
    if (forum.likes.indexOf(user) < 0) forum.likes.push(user);

    this.forumService.saveDB();

    return {
      ...forum,
      like: forum.likes.indexOf(user) >= 0,
      likes: undefined,
    } as ForumDto;
  }

  @ApiOkResponse({ type: ForumDto })
  @Get("/unlike/:id")
  unlike(@Param("id") id: string, @Req() req: any): ForumDto {
    const forum_id = parseInt(id, 10);
    if (!Number.isInteger(forum_id)) throw new BadRequestException();

    const forum = this.forumService.getForumInfo(forum_id);
    if (!forum) throw new BadRequestException();

    const user = req.userName;
    forum.likes = forum.likes.filter(vv => vv !== user);

    this.forumService.saveDB();

    return {
      ...forum,
      like: forum.likes.indexOf(user) >= 0,
      likes: undefined,
    } as ForumDto;
  }
}
