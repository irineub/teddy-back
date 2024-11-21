import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';
import { Client } from 'src/database/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = await this.clientRepository.save(createClientDto);
    return client;
  }

  async findAll(page: number, pageSize: number): Promise<{ clients: Client[], totalItems: number }> {
    const [clients, totalItems] = await this.clientRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { clients, totalItems };
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({where:{id}});
    if (!client) {
      throw new NotFoundException('Cliente não Encontrado');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepository.findOne({where:{id}});
    if (!client) {
      throw new NotFoundException('Cliente não Encontrado');
    }
    await this.clientRepository.update(id, updateClientDto);
    return this.clientRepository.findOne({where:{id}});
  }

  async delete(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
