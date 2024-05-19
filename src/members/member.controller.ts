import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './interfaces/member.interface';
import { MemberDto } from './dto/member.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async findAll(): Promise<{
    data: Member[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.memberService.findAll();
    return { data: res };
  }

  @Post()
  async create(@Body() member: MemberDto): Promise<any> {
    const res = await this.memberService.create(member);
    return res;
  }

  @Post('remove-members')
  async removeMembers(@Body() ids: string[]): Promise<any> {
    const res = await this.memberService.removeMembers(ids);
    return res;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() member: MemberDto,
  ): Promise<any> {
    return this.memberService.update(id, member);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.memberService.remove(id);
  }
}