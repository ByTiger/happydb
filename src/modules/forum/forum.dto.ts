import { ApiProperty } from "@nestjs/swagger";

export class ForumDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  replies: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  like: boolean;
}

export class ForumEntity {
  id: number;

  title: string;

  photo: string;

  owner: string;

  replies: number;

  date: string;

  likes: string[];
}
