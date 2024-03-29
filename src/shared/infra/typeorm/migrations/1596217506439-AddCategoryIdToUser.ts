import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddCategoryIdToUser1596217506439
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'CategoryRef',
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'category',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'CategoryRef');
    }
}
