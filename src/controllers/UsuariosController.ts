import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Usuarios from '../models/Usuarios';
import userView from '../views/user_views';

export default {
    async index(request: Request, response: Response) {
        const usuariosRepository = getRepository(Usuarios);

        const usuarios = await usuariosRepository.find({
            relations: ['avatar'],
        });

        return response.json(userView.renderMany(usuarios));
    },

    async show(request: Request, response: Response) {
        const usuariosRepository = getRepository(Usuarios);
        const { id } = request.params;

        const usuario = await usuariosRepository.findOneOrFail(id, {
            relations: ['avatar'],
        });

        return response.json(userView.render(usuario));
    },

    async create(request: Request, response: Response) {
        const { nome, funcao, departamento, email, telefone } = request.body;

        const usuariosRepository = getRepository(Usuarios);

        const verificaUsuarioExiste = await usuariosRepository.findOne({
            where: { email },
        });
        if (verificaUsuarioExiste) {
            throw new Error('Endereço de email já cadastrado.');
        }

        const requestAvatar = request.files as Express.Multer.File[];
        const avatar = requestAvatar.map(image => {
            return { path: image.filename };
        });
        const usuario = usuariosRepository.create({
            nome,
            funcao,
            departamento,
            email,
            telefone,
            curtidas: 1,
            avatar,
        });

        await usuariosRepository.save(usuario);

        return response.json(userView.render(usuario));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const { nome, funcao, departamento, email, telefone } = request.body;

        const requestAvatar = request.files as Express.Multer.File[];
        const avatar = requestAvatar.map(image => {
            return { path: image.filename };
        });

        const usuariosRepository = getRepository(Usuarios);

        const usuarioAntigo = await usuariosRepository.findOne(id);

        const usuarioAtualizado = {
            id: usuarioAntigo?.id,
            nome,
            funcao,
            departamento,
            email,
            telefone,
            curtidas: usuarioAntigo?.curtidas,
            avatar,
        };

        await usuariosRepository.delete(id);

        usuariosRepository.create(usuarioAtualizado);

        await usuariosRepository.save(usuarioAtualizado);

        return response.json({ sucesso: 'Usuário atualizado com sucesso' });
    },

    async exclude(request: Request, response: Response) {
        const { id } = request.params;

        const usuariosRepository = getRepository(Usuarios);

        await usuariosRepository.delete(id);

        return response.send();
    },
    async like(request: Request, response: Response) {
        const { id } = request.params;

        const usuariosRepository = getRepository(Usuarios);

        const usuario = usuariosRepository.findOne(id);

        usuario.curtidas += 1;

        return response.json({ curtidas: usuario.curtidas });
    },
};
