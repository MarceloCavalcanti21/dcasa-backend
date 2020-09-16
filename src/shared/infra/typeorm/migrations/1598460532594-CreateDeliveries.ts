import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDeliveries1598460532594
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'deliveries',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'adress_id',
                        type: 'uuid',
                    },
                    {
                        name: 'hour',
                        type: 'numeric',
                    },
                    {
                        name: 'minute',
                        type: 'numeric',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'status',
                        type: 'numeric',
                        isNullable: true,
                    },
                    {
                        name: 'delay',
                        type: 'numeric',
                        isNullable: true,
                    },
                    {
                        name: 'motoboy_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'UserDelivery-3',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'Motoboy-3',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['motoboy_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'Adress-3',
                        referencedTableName: 'adress',
                        referencedColumnNames: ['id'],
                        columnNames: ['adress_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'Category-3',
                        referencedTableName: 'category',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('deliveries');
    }
}
