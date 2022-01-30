import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Create a user inside repository
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  // Find a user with a given id
  findOne(id: number) {
    return this.repo.findOne(id);
  }

  // Find all users with given email
  find(email: string) {
    return this.repo.find({ email });
  }

  // Update a user with given id
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      // Throw not found exception
      throw new NotFoundException(`User with id ${id} not found`);
      // throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  
  // Delte user with given id
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
      // throw new Error('User not found');
    }
    return this.repo.remove(user);
  }
}
