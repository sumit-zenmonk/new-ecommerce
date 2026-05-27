import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// Common Module
import { BcryptService } from './module/common/infrastruture/services/bcrypt.service';
import { SocketModule } from './module/common/infrastruture/socket/socket.module';
import { RabbitMQModule } from './module/common/infrastruture/rabbit-mq/rabbit-mq.module';
import { AuthenticateMiddleware } from './module/common/infrastruture/middleware/authenticate.middleware';

@Module({
  imports: [
    // common
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_REGISTER_SECRET,
      // signOptions: { expiresIn: '60m' },
    }),
    RabbitMQModule,
    ScheduleModule.forRoot(),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: '/user/login', method: RequestMethod.ALL },
        { path: '/user/register', method: RequestMethod.ALL },
        { path: '/product', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}