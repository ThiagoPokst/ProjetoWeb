const Post = require('../module/Post');

module.exports = {
    async store(request, response){ 
        
        const { text, user } = request.body;

        post = await Post.create({
            text,
            user
        })
    
    return response.json(post);
    }, 

    async index(request, response) {
    
        const post = await Post.find().populate('user');
    
        return response.json(post);
    }
}