import { Controller, Get } from '@nestjs/common';

@Controller('clients')
export class ClientsController {
    @Get()
    findAll(){
        return'Lista de Clientes'
    }
}
