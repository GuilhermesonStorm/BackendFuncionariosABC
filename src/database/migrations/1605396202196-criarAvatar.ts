import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class criarAvatar1605396202196 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'avatar',
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
                        name: 'user_id',
                        type: 'integer',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'AvatarUser',
                        columnNames: ['user_id'],
                        referencedTableName: 'usuarios',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('avatar');
    }
}
