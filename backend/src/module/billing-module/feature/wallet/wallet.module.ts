import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetAccountModule } from "./get-wallet/get-wallet.module";
import { GetPayHistoryModule } from "./get-pay-history/get-pay-history.module";
import { AddAmountModule } from "./add-amount/add-amount.module";

@Module({
    imports: [
        GetAccountModule,
        GetPayHistoryModule,
        AddAmountModule,
        RouterModule.register([
            {
                path: 'wallet',
                children: [
                    { path: '', module: GetAccountModule },
                    { path: '', module: GetPayHistoryModule },
                    { path: '', module: AddAmountModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class WalletModule { }