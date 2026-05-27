export interface PublishHeadersInterface {
    'x-match'?: 'all' | 'any';
    [key: string]: any;
}

export type ExchangeType = | 'direct' | 'fanout' | 'topic' | 'headers';


// RabbitMQ Payloads down here

export interface RabbitMQConsumerMessage<TPayload = unknown> {
    outbox_uuid: string;
    payload: TPayload;
}

export interface UserRegisteredEventPayload {
    uuid: string;
    name: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
