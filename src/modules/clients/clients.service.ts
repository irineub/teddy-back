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
    return client
  }

  async findAll(): Promise<Client[]> {
   const clientsList = await this.clientRepository.find();
    return clientsList
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({where:{id}});
    if(!client){
      throw new NotFoundException('Cliente não Encontrado')
    }
    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.clientRepository.update(id, updateClientDto);
    return
  }

  async delete(id: number): Promise<void>{
    await this.clientRepository.delete(id);
    return
  }
}
