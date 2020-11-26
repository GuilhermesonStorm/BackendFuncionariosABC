import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import AvatarDependente from './AvatarDependente';

import Usuarios from './Usuarios';

@Entity('dependentes')
export default class Dependentes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    data_nascimento: string;

    @Column()
    grau_parentesco: number;

    @Column()
    id_funcionario: number;

    @ManyToOne(() => Usuarios, funcionario => funcionario.dependente, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'id_funcionario' })
    funcionario: Usuarios;

    @OneToMany(
        () => AvatarDependente,
        avatar_dependente => avatar_dependente.dependente,
        {
            cascade: ['insert', 'update'],
        },
    )
    @JoinColumn({ name: 'dependente_id' })
    avatar_dependente: AvatarDependente[];
}
