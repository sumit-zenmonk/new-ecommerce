import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "src/module/billing-module/infrastructure/repository/order.repository";
import { OutboxRepository } from "src/module/billing-module/infrastructure/repository/outbox.repository";
import { ExchangeNameEnum, RoutingKeyEnum } from "src/module/common/infrastruture/rabbit-mq/type-enum/rabbit-mq.enum";
import type { OrderCreatedMQEventPayload } from "src/module/common/infrastruture/rabbit-mq/type-enum/rabbit-mq.type";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class OrderCreatedService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly outboxRepository: OutboxRepository,
    ) { }

    @Transactional({
        connectionName: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
    })
    async handle(order: OrderCreatedMQEventPayload) {
        try {
            await this.orderRepository.createOrder(
                {
                    user_uuid: order.user_uuid,
                    uuid: order.order_uuid,
                    id: order.order_id,
                    created_at: order.created_at,
                    total_price: order.total_price
                }
            );

            // create outbox entry
            await this.outboxRepository.createOutboxEntry({
                exchange_name: ExchangeNameEnum.ORDER_EXCHANGE,
                routing_key: RoutingKeyEnum.BILLING_ORDER_CREATED,
                message_payload: {
                    order_uuid: order.order_uuid,
                    user_uuid: order.user_uuid,
                },
            });

            return;
        } catch (error: any) {
            throw error;
        }
    }
}