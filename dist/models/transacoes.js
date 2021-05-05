"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Transacao = /** @class */ (function () {
    function Transacao() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Transacao.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('uuid'),
        __metadata("design:type", String)
    ], Transacao.prototype, "categoria_id", void 0);
    __decorate([
        typeorm_1.Column('uuid'),
        __metadata("design:type", String)
    ], Transacao.prototype, "usuario_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transacao.prototype, "tipo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transacao.prototype, "valor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Transacao.prototype, "vencimento", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transacao.prototype, "periodicidade", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transacao.prototype, "parcelas", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Transacao.prototype, "debitoAut", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transacao.prototype, "observacao", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Transacao.prototype, "criado_em", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Transacao.prototype, "atualizado_em", void 0);
    Transacao = __decorate([
        typeorm_1.Entity('transacoes')
    ], Transacao);
    return Transacao;
}());
exports.default = Transacao;
