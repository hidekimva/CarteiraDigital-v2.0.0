"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CrianandoTabelaUsuario1620180975273 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'usuarios',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'nome',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'senha',
        type: 'varchar'
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
      name: 'transacaoUsuario',
      columnNames: ['usuario_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'usuarios',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('transacoes', 'transacaoUsuario');
    await queryRunner.dropTable('usuarios');
  }

}

exports.default = CrianandoTabelaUsuario1620180975273;