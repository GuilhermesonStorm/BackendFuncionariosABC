import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class avatarDependente1606003574035
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'avatar_dependente',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'path',
                        type: 'varchar',
                    },
                    {
                        name: 'dependente_id',
                        type: 'integer',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'AvatarDependente',
                        columnNames: ['dependente_id'],
                        referencedTableName: 'dependentes',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('avatar_dependente');
    }
}
