var express=require('express');

var bind=require('bind');

var database=require('./database.js');

var bodyParser=require('body-parser');

var app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//listen to a specific port
app.set('port', (process.env.PORT || 5000));

app.get('/script.js', function(req, res){
    res.sendFile('tpl/script.js', {root:__dirname});
});

app.get('/style.js', function(req, res){
    res.sendFile('tpl/style.js', {root:__dirname});
});

var defaultOptions={
    hidden: 'hidden',
    id: '',
    nome:'',
    surname:'',
    level:'',
    salary:''
}

function merge_options(obj1,obj2){
    var obj3={};
    for (var attrname in obj1) {obj3[attrname]=obj1[attrname];}
    for (var attrname in obj2) {obj3[attrname]=obj2[attrname];}
    return obj3;
    
}

app.get('/', function(req, res){
    bind.toFile('tpl/home.html', defaultOptions, function(data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

app.post('/search', function(req, res){
    var employee=database.get(req.body.id);
    if (employee!=undefined){
        bind.toFile('tpl/home.html',
                {
                   id: employee[0],
                   nome: employee[1],
                   surname: employee[2],
                   level: employee[3],
                   salary: employee[4],
                   hiddenButton: 'hidden'
    },
        function(data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
    } else {
        bind.toFile('tpl/home.html', merge_options(defaultOptions, {
            message:"not found"
        }), 
        function(data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        });
    }
});

app.post('/delete', function(req, res){
    var x=database.remove(req.body.id);
    
    var msg;
    
    if (x==0) msg='deleted successfully';
    else msg='item to delete not found';
    
    bind.toFile('tpl/home.html', 
    merge_options(defaultOptions, {message: msg}),
    function(data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
    });
});

app.post('/insert', function(req, res){
    var x=database.add(req.body.id,
                req.body.nome,
                req.body.surname,
                req.body.level,
                req.body.salary
                );
    var msg;
    
    if (x==0) msg='modified successfully';
    else msg='inserted successfully';
    
    bind.toFile('tpl/home.html',
               merge_options(defaultOptions, {
        message: msg}),
    function(data){
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(data);    
    });
});

app.listen(app.get('port'), function() {
  	console.log('Node app is running on port', app.get('port'));
});














