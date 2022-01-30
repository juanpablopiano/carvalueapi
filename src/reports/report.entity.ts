import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  // @Column()
  // make: string;

  // @Column()
  // model: string;

  // @Column()
  // year: number;

  // @Column()
  // mileage: number;

  // @Column()
  // longitude: number;

  // @Column()
  // latitude: number;
}
