const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGOLINK, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const Users = mongoose.model('user', mongoose.Schema({
    id: { required: true, type: String },
    todos: [{}]
}));

exports.handler = function(event, context, callback){
    try{
        console.log(event);
        if(event.httpMethod === 'POST' && context.clientContext.user){
            console.clear();
            let user = context.clientContext.user;
            let {sub, email} = user;
            let todos = JSON.parse(event.body).todos;
            save(sub, email, todos);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ msg: 'done' }),
                headers: {
                    'content-type': 'application/json'
                }
            });
        }
        else if(event.httpMethod === 'GET' && context.clientContext.user){
            console.clear();
            console.log('Get');
            console.clear();
            let user = context.clientContext.user;
            let {sub} = user;
            let todos;
            Users.aggregate([{$match: {id: sub}}]).then(res => {
                todos = res[0].todos;
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(todos),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
            });
        }
    }catch(err){
        console.log(err.message);
    }
}

async function save(id, email, todos){
    try{
        let count = await Users.aggregate([{$match: {id}}]);
        if(count.length===0){
            await new Users({id, email, todos}).save();
        }
        else {
            await Users.findOneAndUpdate({id}, {todos, file: 1});
        }
    }catch(err){
        console.log(err.message);
    }
}
