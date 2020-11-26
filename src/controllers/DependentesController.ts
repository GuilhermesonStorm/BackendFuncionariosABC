import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Dependentes from '../models/Dependentes';

export default {
    async index(request: Request, response: Response) {
        const dependentesRepository = getRepository(Dependentes);

        const dependentes = await dependentesRepository.find({
            relations: ['avatar_dependente'],
        });

        return response.json(dependentes);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const dependentesRepository = getRepository(Dependentes);

        const dependente = await dependentesRepository.findOne(id, {
            relations: ['avatar_dependente'],
        });

        return response.json(dependente);
    },

    async create(request: Request, response: Response) {
        const {
            nome,
            data_nascimento,
            grau_parentesco,
            id_funcionario,
        } = request.body;

        const dependentesRepository = getRepository(Dependentes);

        const requestAvatar = request.files as Express.Multer.File[];
        const avatar_dependente = requestAvatar.map(image => {
            return { path: image.filename };
        });

        const dependente = dependentesRepository.create({
            nome,
            data_nascimento,
            grau_parentesco,
            id_funcionario,
            avatar_dependente,
        });

        await dependentesRepository.save(dependente);

        return response.json(dependente);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            nome,
            data_nascimento,
            grau_parentesco,
            id_funcionario,
        } = request.body;

        const requestAvatar = request.files as Express.Multer.File[];
        const avatar_dependente = requestAvatar.map(image => {
            return { path: image.filename };
        });

        const dependentesRepository = getRepository(Dependentes);

        const dependenteAntigo = await dependentesRepository.findOne(id);

        const dependenteAtualizado = {
            id: dependenteAntigo?.id,
            nome,
            data_nascimento,
            grau_parentesco,
            id_funcionario,
            avatar_dependente,
        };

        await dependentesRepository.delete(id);

        dependentesRepository.create(dependenteAtualizado);

        await dependentesRepository.save(dependenteAtualizado);

        return response.json({ mensagem: 'Dependente atualizado com sucesso' });
    },

    async exclude(request: Request, response: Response) {
        const { id } = request.params;

        const dependentesRepository = getRepository(Dependentes);

        await dependentesRepository.delete(id);

        return response.send();
    },

    async showByUser(request: Request, response: Response) {
        const { id_funcionario } = request.params;

        const dependentesRepository = getRepository(Dependentes);

        const dependentesArray = dependentesRepository.find({
            where: { id_funcionario },
        });

        return response.json(dependentesArray);
    },
};
