let users = [];

exports.handler = function(event, context, callback){
    if(event.httpMethod === 'POST' && context.clientContext.user){
        let user = context.clientContext.user;
        let todos = JSON.parse(event.body).todos;
        let index = users.findIndex(u => u.id==user.sub);

        if(index>-1) users[index].todos = todos;
        else {
            users.push({id: user.sub, todos});
            index = users.length - 1;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(users[index]),
            headers: {
                'content-type': 'application/json'
            }
        });
    }
    if(event.httpMethod === 'GET' && context.clientContext.user){
        let user = context.clientContext.user;
        let index = users.findIndex(u => u.id==user.sub);

        if(index==-1){
            users.push({id: user.sub, todos: []});
            index = users.length - 1;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(users[index]),
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
