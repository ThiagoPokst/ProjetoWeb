const User = require('../module/User');

module.exports = {

    async store(request, response) {
    
        const { login, pass, bio, ocup } = request.body;

        let user = await User.findOne({ login });

        if (!user){
            user = await User.create({
                login,
                pass,
                bio,
                ocup
            })
        }
    
        return response.json(user);
    }    

}