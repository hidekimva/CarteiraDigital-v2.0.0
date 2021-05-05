import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transacoes')
class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  categoria_id: string;

  @Column('uuid')
  usuario_id: string;

  @Column()
  tipo: string;

  @Column()
  valor: number;

  @Column()
  vencimento: Date;

  @Column()
  periodicidade: string;

  @Column()
  parcelas: number;

  @Column()
  debitoAut: number;

  @Column()
  observacao: string;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
}

export default Transacao;
