import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import Avatar from './Avatar';
import Dependentes from './Dependentes';

@Entity('usuarios')
export default class Usuarios {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    funcao: string;

    @Column()
    departamento: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    curtidas: number;

    @OneToMany(() => Avatar, avatar => avatar.usuario, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'user_id' })
    avatar: Avatar[];

    @OneToMany(() => Dependentes, dependente => dependente.funcionario, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'id_funcionario' })
    dependente: Dependentes[];
}
