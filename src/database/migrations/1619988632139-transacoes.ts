import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class transacoes1619988632139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transacoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'tipo',
            type: 'varchar',
          },
          {
            name: 'valor',
            type: 'float',
          },
          {
            name: 'observacao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'criado_em',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'atualizado_em',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transacoes');
  }
}
