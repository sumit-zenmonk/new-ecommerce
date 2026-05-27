import { Global, Module } from '@nestjs/common';
// Common Service
import { RabbitMQService } from './rabbit-mq.service';

// User Module
import * as UserUserRepository from 'src/module/user-module/infrastructure/repository/user.repository';

// Catalog Module
import * as CatalogUserRepository from 'src/module/catalog-module/infrastructure/repository/user.repository';
import * as CatalogInboxRepository from 'src/module/catalog-module/infrastructure/repository/inbox.repository';
import * as CatalogUserRegisteredConsumer from 'src/module/catalog-module/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as CatalogUserRegisterHandler from 'src/module/catalog-module/feature/user/user-register/user-register.handler';

// Sale Module
import * as SaleUserRepository from 'src/module/sale-module/infrastructure/repository/user.repository';
import * as SaleInboxRepository from 'src/module/sale-module/infrastructure/repository/inbox.repository';
import * as SaleUserRegisteredConsumer from 'src/module/sale-module/infrastructure/rabbit-mq-consumer/user/user-registered/user-registered.consumer';
import * as SaleUserRegisterHandler from 'src/module/sale-module/feature/user/user-register/user-register.handler';

@Global()
@Module({
    imports: [],
    providers: [
        // Common Service
        RabbitMQService,

        // User Module
        UserUserRepository.UserRepository,

        // Catalog Module
        CatalogUserRepository.UserRepository,
        CatalogInboxRepository.InboxRepository,
        CatalogUserRegisteredConsumer.UserRegisteredConsumer,
        CatalogUserRegisterHandler.UserRegisterService,

        // Sale Module
        SaleUserRepository.UserRepository,
        SaleInboxRepository.InboxRepository,
        SaleUserRegisteredConsumer.UserRegisteredConsumer,
        SaleUserRegisterHandler.UserRegisterService,
    ],
    exports: [RabbitMQService],
})
export class RabbitMQModule { }