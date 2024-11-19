import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientRepository {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async save(name: string, salary: number, companyValue: number): Promise<Client> {
    const client = this.clientRepository.create({ name, salary, companyValue });
    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, name: string, salary: number, companyValue: number): Promise<Client> {
    const client = await this.findOne(id);  
    client.name = name;
    client.salary = salary;
    client.companyValue = companyValue;
    return await this.clientRepository.save(client);
  }

  async delete(id: number): Promise<void> {
    const client = await this.findOne(id); 
    await this.clientRepository.delete(id);
  }
}
