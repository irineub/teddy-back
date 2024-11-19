import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from 'src/database/repositories/client.repository';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';
import { Client } from 'src/database/entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private readonly clientRepository: ClientRepository,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientRepository.save(createClientDto.name, createClientDto.salary, createClientDto.companyValue);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne(id); 
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id); 
    return this.clientRepository.update(id, updateClientDto.name, updateClientDto.salary, updateClientDto.companyValue);
  }

  async delete(id: number): Promise<void> {
    const client = await this.findOne(id); 
    await this.clientRepository.delete(id); 
  }
}
