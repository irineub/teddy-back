import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;
  
  @Column('decimal', { precision: 15, scale: 2 })
  companyValue: number;
}
