import { IsUUID, IsNumber, IsArray, ValidateNested, IsString, IsOptional, IsPositive, Min, ArrayNotEmpty, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @IsUUID()
    product_uuid: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ArrayNotEmpty({ message: 'Order must have at least one item' })
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}