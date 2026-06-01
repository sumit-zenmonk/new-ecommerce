import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { WalletHistoryEntity } from "../../domain/wallet-history/wallet-history.entity";

@Injectable()
export class WalletHistoryRepository {
    constructor(
        @InjectDataSource(
            process.env.DB_POSTGRES_BILLING_SCHEMA || "billing_schema",
        )
        private readonly dataSource: DataSource,
    ) { }

    private getRepository() {
        return this.dataSource.getRepository(
            WalletHistoryEntity,
        );
    }

    async createHistory(payload: Partial<WalletHistoryEntity>) {
        const repository = this.getRepository();
        const history = repository.create(payload);

        return await repository.save(history);
    }

    async findHistories(user_uuid: string) {
        return await this.getRepository().find({
            where: {
                user_uuid,
            },
            order: {
                created_at: "DESC",
            },
        });
    }

    async findHistoryByOrderUuid(order_uuid: string) {
        return await this.getRepository().findOne({
            where: {
                order_uuid,
            },
        });
    }
}