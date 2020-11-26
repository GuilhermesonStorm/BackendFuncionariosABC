import Avatar from '../models/Avatar';

export default {
    render(avatar: Avatar) {
        return {
            id: avatar.id,
            url: `http://localhost:3333/uploads/${avatar.path}`,
        };
    },

    renderMany(avatares: Avatar[]) {
        return avatares.map(avatar => this.render(avatar));
    },
};
