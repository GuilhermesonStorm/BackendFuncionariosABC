import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Usuarios from './Usuarios';

@Entity('avatar')
export default class Avatar {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Usuarios, usuario => usuario.avatar)
    @JoinColumn({ name: 'user_id' })
    usuario: Usuarios;
}
