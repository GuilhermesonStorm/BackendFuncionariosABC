import Usuarios from '../models/Usuarios';
import avatarView from './avatar_views';

export default {
    render(usuario: Usuarios) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            funcao: usuario.funcao,
            departamento: usuario.departamento,
            email: usuario.email,
            telefone: usuario.telefone,
            curtidas: usuario.curtidas,
            avatar: avatarView.renderMany(usuario.avatar),
        };
    },

    renderMany(usuarios: Usuarios[]) {
        return usuarios.map(usuario => this.render(usuario));
    },
};
