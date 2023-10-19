import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-users.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserResponseDto } from './dto/users.response.dto';
import { UserCreateDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findUser(authEmail: string): Promise<User> {
    const user = await this.userModel.findOne({ authEmail });
    return user;
  }

  async validateUser(dto: UserCreateDto): Promise<User> {
    const user = await this.findUser(dto.authEmail);

    if (!user) {
      throw new UnauthorizedException('Email or password is wrong!');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email or password is wrong!');
    }
    return user;
  }

  async createUser(dto: UserCreateDto): Promise<void> {
    const user = await this.findUser(dto.authEmail);

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

    if (!newUser) {
      throw new InternalServerErrorException(
        'Something went wrong. Please, try again!',
      );
    }
    return;
  }

  async loginUser(user: User): Promise<UserResponseDto> {
    const token = await this.jwtService.signAsync(user._id.toString());
    const loggedUser = await this.userModel
      .findByIdAndUpdate(user._id, { token }, { new: true })
      .select('-password -updatedAt -createdAt');

    return loggedUser;
  }

  async logoutUser(user: UserResponseDto): Promise<void> {
    const loggedOutUser = await this.userModel.findByIdAndUpdate(user._id, {
      token: null,
    });
    if (!loggedOutUser) {
      throw new InternalServerErrorException(
        'Something went wrong. Please, try again!',
      );
    }
    return;
  }

  async updateUser(
    dto: UpdateUserDto,
    id: string,
    file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    if (Object.keys(dto).length === 0 && !file) {
      throw new BadRequestException('At least one field required!');
    }

    const userToUpdate = await this.userModel.findById(id);

    if (!userToUpdate) {
      throw new NotFoundException('No such user!');
    }

    if (file) {
      const avatar = await this.cloudinaryService.uploadImage(
        file,
        userToUpdate,
        userToUpdate._id.toString(),
      );
      dto.avatar = avatar.url;
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .select('-updatedAt -createdAt -password -token');
    return updatedUser;
  }

  async refreshfUser(user: UserResponseDto): Promise<UserResponseDto> {
    const foundUser = await this.userModel
      .findById(user._id)
      .select('-password -updatedAt -createdAt -token');

    return foundUser;
  }

  async shareContact(id: string, shareLink: string): Promise<UserResponseDto> {
    const sharedUser = await this.userModel
      .findById(id)
      .select('-password -updatedAt -createdAt -token -_id');
    if (!sharedUser || sharedUser.shareLink !== shareLink) {
      throw new NotFoundException('No user to add!');
    }
    return sharedUser;
  }
}
