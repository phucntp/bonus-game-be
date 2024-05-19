import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './interfaces/member.interface';
import { MemberDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async create(createMember: MemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMember);
    return createdMember.save();
  }

  async update(id: string, updateMember: MemberDto): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(id, updateMember);
  }

  async remove(id: string): Promise<Member> {
    return this.memberModel.findByIdAndDelete(id);
  }

  async removeMembers(ids: string[]): Promise<Member> {
    const res = await Promise.all(
      ids.map((id) => {
        return this.memberModel.findByIdAndUpdate(id, { deleted: true });
      }),
    );
    return res as any;
  }
}