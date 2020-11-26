import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import Dependentes from './Dependentes';

@Entity('avatar_dependente')
export default class AvatarDependente {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @Column()
    dependente_id: number;

    @ManyToOne(() => Dependentes, dependente => dependente.avatar_dependente)
    @JoinColumn({ name: 'dependente_id' })
    dependente: Dependentes;
}
