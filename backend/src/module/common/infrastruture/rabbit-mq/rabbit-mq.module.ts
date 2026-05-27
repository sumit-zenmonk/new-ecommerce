import { Global, Module } from '@nestjs/common';
// Common Service
import { RabbitMQService } from './rabbit-mq.service';

// User Service
import * as UsermoduleUserRepo from 'src/module/user-module/infrastructure/repository/user.repository';

@Global()
@Module({
    imports: [],
    providers: [
        // Common Service
        RabbitMQService,

        // User Service
        UsermoduleUserRepo.UserRepository,
    ],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }