import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { WalletEntity } from "../../domain/wallet/wallet.entity";

@Injectable()
export class WalletRepository {
    constructor(
        @InjectDataSource(
            process.env.DB_POSTGRES_BILLING_SCHEMA || "billing_schema",
        )
        private readonly dataSource: DataSource,
    ) { }

    private getRepository() {
        return this.dataSource.getRepository(WalletEntity);
    }

    async findWallet(user_uuid: string) {
        return await this.getRepository().findOne({
            where: { user_uuid },
        });
    }

    async createWallet(payload: Partial<WalletEntity>) {
        const repository = this.getRepository();
        const wallet = repository.create(payload);
        return await repository.save(wallet);
    }

    async saveWallet(wallet: WalletEntity) {
        return await this.getRepository().save(wallet);
    }

    async updateBalance(uuid: string, balance: number) {
        return await this.getRepository().update(
            { uuid },
            { balance },
        );
    }
}