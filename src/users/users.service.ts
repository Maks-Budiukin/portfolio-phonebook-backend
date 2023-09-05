import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';
import { UserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async validateUser(dto: UserDto): Promise<User> {
    const user = await this.findUser(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is wrong!');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email or password is wrong!');
    }
    return user;
  }

  async createUser(dto: UserDto): Promise<Object> {
    const user = await this.findUser(dto.email);

    if (user) {
      throw new ConflictException('User with this email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const shareLink = v4();

    const newUser = await this.userModel.create({
      ...dto,
      password: passwordHash,
      shareLink,
    });

    return { message: 'User created!' };
  }

  async loginUser(user: UserDto): Promise<User> {
    const token = await this.jwtService.signAsync(user._id.toString());
    const loggedUser = await this.userModel
      .findByIdAndUpdate(user._id, { token }, { new: true })
      .select('-password -updatedAt -createdAt');

    return loggedUser;
  }

  async logoutUser(user) {
    await this.userModel.findByIdAndUpdate(user._id, { token: null });

    return;
  }

  async updateUser(dto: UpdateUserDto, id: string, user): Promise<User> {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('At least one field required!');
    }

    const userToUpdate = await this.userModel.findById(id);

    if (!userToUpdate) {
      throw new NotFoundException('No such user!');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .select('-updatedAt -createdAt -password -token');
    return updatedUser;
  }

  async refreshfUser(user): Promise<User> {
    const foundUser = await this.userModel
      .findById(user._id)
      .select('-password -updatedAt -createdAt -token');

    return foundUser;
  }

  async shareContact(id: string, shareLink: string): Promise<User> {
    const sharedUser = await this.userModel
      .findById(id)
      .select('-password -updatedAt -createdAt -token -_id');
    if (!sharedUser || sharedUser.shareLink !== shareLink) {
      throw new NotFoundException('No user to add!');
    }
    return sharedUser;
  }
}
