import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';
import { Client } from 'src/database/entities/client.entity';
import { ApiQuery, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false }) 
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiOperation({ summary: 'Obter todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [Client] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ): Promise<{ clients: Client[], totalItems: number }> {
    return this.clientsService.findAll(page, pageSize);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo cliente' })
  @ApiBody({
    description: 'Detalhes do cliente para criar um novo cliente',
    type: CreateClientDto,
    examples: {
      exemplo1: {
        value: {
          name: 'Irineu',
          salary: 10000,
          companyValue: 1000000,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso', type: Client })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: Client })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async findOne(@Param('id') id: number): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um cliente pelo ID' })
  @ApiBody({
    description: 'Detalhes do cliente para atualizar',
    type: UpdateClientDto,
  })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso', type: Client })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.clientsService.delete(id);
  }
}
