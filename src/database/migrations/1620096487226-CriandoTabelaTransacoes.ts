import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriandoTabelaTransacoes1620096487226
  implements MigrationInterface {
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
            name: 'categoria_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'usuario_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'vencimento',
            type: 'Date',
            isNullable: true,
          },
          {
            name: 'periodicidade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parcelas',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'debitoAut',
            type: 'integer',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'transacoes',
      new TableForeignKey({
        name: 'transacaoCategorias',
        columnNames: ['categoria_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categorias',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transacoes', 'transacaoCategorias');

    await queryRunner.dropTable('transacoes');
  }
}
