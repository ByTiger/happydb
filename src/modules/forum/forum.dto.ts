import { ApiProperty } from "@nestjs/swagger";

export class ForumDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  photo: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  replies: number;

  @ApiProperty({ type: String })
  date: string;

  @ApiProperty({ type: Boolean })
  like: boolean;
}
