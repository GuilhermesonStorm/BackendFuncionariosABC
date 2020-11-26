import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class criarDependente1605908940162
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dependentes',
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
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'data_nascimento',
                        type: 'varchar',
                    },
                    {
                        name: 'grau_parentesco',
                        type: 'integer',
                    },
                    {
                        name: 'id_funcionario',
                        type: 'integer',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'IdFuncionario',
                        columnNames: ['id_funcionario'],
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
        await queryRunner.dropTable('dependentes');
    }
}
