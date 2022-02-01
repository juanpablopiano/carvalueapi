import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert(): void {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate(): void {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove(): void {
    console.log('Removed User with id', this.id);
  }
}
