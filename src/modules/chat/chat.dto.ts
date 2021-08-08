import { ApiProperty } from "@nestjs/swagger";

export class ChatDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  forumId: number;

  @ApiProperty()
  senderName: string;

  @ApiProperty({ required: false })
  receiverName?: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  date: string;
}

export class AddMessageDto {
  @ApiProperty()
  forumId: number;

  @ApiProperty({ required: false })
  receiverName?: string;

  @ApiProperty()
  message: string;
}

export class ChatEntity {
  id: string;
  forumId: number;
  senderName: string;
  receiverName?: string;
  message: string;
  date: string;
}
