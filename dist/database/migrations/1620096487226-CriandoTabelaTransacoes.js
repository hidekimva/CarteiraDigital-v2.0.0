"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CriandoTabelaTransacoes1620096487226 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'transacoes',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'categoria_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'usuario_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'tipo',
        type: 'varchar'
      }, {
        name: 'valor',
        type: 'float'
      }, {
        name: 'vencimento',
        type: 'Date',
        isNullable: true
      }, {
        name: 'periodicidade',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'parcelas',
        type: 'integer',
        isNullable: true
      }, {
        name: 'debitoAut',
        type: 'integer',
        isNullable: true
      }, {
        name: 'observacao',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'criado_em',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'atualizado_em',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('transacoes', new _typeorm.TableForeignKey({
      name: 'transacaoCategorias',
      columnNames: ['categoria_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categorias',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('transacoes', 'transacaoCategorias');
    await queryRunner.dropTable('transacoes');
  }

}

exports.default = CriandoTabelaTransacoes1620096487226;