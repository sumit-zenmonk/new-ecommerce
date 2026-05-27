import { Module } from "@nestjs/common";
import { BillingRepository } from "src/module/billing-module/infrastructure/repository/billing.repository";
import { GetPayHistoryController } from "./get-pay-history.controller";
import { GetPayHistoryService } from "./get-pay-history.service";

@Module({
    imports: [],
    controllers: [GetPayHistoryController],
    providers: [GetPayHistoryService, BillingRepository],
    exports: [],
})
export class GetPayHistoryModule { }
