/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      let user: User | Admin | null = null;;
      
      if (decoded.role === 'user') {
        user = await this.userRepository.findOne({ where: { id: decoded.sub } });
      }

      if (decoded.role === 'admin') {
        user = await this.adminRepository.findOne({ where: { id: decoded.sub } });
      }

      if (!user) {
        throw new UnauthorizedException('Foydalanuvchi topilmadi');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Tokenni tekshirishda xato!');
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { username, email, password, region, district } = registerAuthDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException(`Bu email allaqachon ro'yxatdan o'tgan: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      role: 'user',
      email,
      password: hashedPassword,
      region,
      district,
    });

    await this.userRepository.save(newUser);

    return { message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi!', user: newUser };
  }


  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    
    let user: User | Admin | null = await this.userRepository.findOne({ where: { email } });
    let role = 'user';
  
    if (!user) {
      user = await this.adminRepository.findOne({ where: { email } });
      role = 'admin';
    }
  
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi!');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Parol noto‘g‘ri!');
    }
  
    const token = this.jwtService.sign({ sub: user.id, role });
  
    return { message: `Muvaffaqiyatli tizimga kirdingiz! (${role})`, token };
  }
  
}
