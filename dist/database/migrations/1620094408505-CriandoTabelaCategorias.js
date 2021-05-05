"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CriandoTabelaCategorias1620094408505 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categorias',
      columns: [{
        name: 'nome',
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
      }, {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4 ()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('categorias');
  }

}

exports.default = CriandoTabelaCategorias1620094408505;