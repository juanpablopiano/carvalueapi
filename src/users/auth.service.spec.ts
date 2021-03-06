import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with salted and hashed password', async () => {
    const password = 'password1';
    const user = await service.signup('email@email.com', password);

    expect(user.password).not.toEqual(password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async done => {
    await service.signup('email@email.com', 'password');
    try {
      await service.signup('email@email.com', 'password');
    } catch (error) {
      done();
    }
  });

  it('throws if signin is called with an unused email', async done => {
    try {
      await service.signin('email@email.com', 'password');
    } catch (err) {
      done();
    }
  });

  it('throws if an invalid password is provided', async done => {
    await service.signup('email@email.com', 'myPassword')
    try {
      await service.signin('email@email.com', 'password');
    } catch (err) {
      done();
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('hola@email.com', 'password123');

    const user = await service.signin('hola@email.com', 'password123');
    expect(user).toBeDefined();
  });
});
