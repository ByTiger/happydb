import { ApiProperty } from "@nestjs/swagger";

export class ChatDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  senderName: string;

  @ApiProperty({ type: String, nullable: true })
  receiverName?: string;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: String })
  date: string;
}

export class AddMessageDto {
  @ApiProperty({ type: String })
  senderName: string;

  @ApiProperty({ type: String, nullable: true })
  receiverName?: string;

  @ApiProperty({ type: String })
  message: string;
}
