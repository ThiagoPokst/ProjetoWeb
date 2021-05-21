const User = require('../module/User');

module.exports = {
    async create(request, response){
        const { login, pass } = request.body;

        const user = await User.findOne({
            login : {
                $eq : login,
            },
            pass : {
                $eq : pass,
            }
        })

        if(!user) return response.status(400).send({ error: 'User not found!'});

        return response.send({user});

    }
}