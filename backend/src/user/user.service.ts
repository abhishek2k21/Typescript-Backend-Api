import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; 

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        phone: createUserDto.phone,
        profile: {
          create: {
            email: createUserDto.profile.email,
            gender: createUserDto.profile.gender,
            address: createUserDto.profile.address,
            pincode: createUserDto.profile.pincode,
            city: createUserDto.profile.city,
            state: createUserDto.profile.state,
            country: createUserDto.profile.country,
          },
        },
      },
    });
    return user;
  }
  

  async findAll() {
    return this.prisma.user.findMany({
      include: { profile: true }, 
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true }, 
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); 
    const { profile, ...userData } = updateUserDto;

    const updateData: any = {
      ...userData,
    };

    if (profile) {
      updateData.profile = {
        update: profile,
      };
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    await this.findOne(id); 
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
