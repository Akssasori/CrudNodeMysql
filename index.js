const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'coti',
    database: 'nodeDB' //Nome do Banco
    //employee é a tabela funcionarios
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB Conectado com sucesso');
    else
    console.log('DB falha na conexao \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is runnig at port no :3000'));

//Get todos os funcionarios
app.get('/funcionarios',(req,res)=>{
    mysqlConnection.query('SELECT * FROM funcionarios',(err,rows, fields)=>{
        if(!err)
        res.send(rows);
        //console.log(rows[0].ID);
        else
        console.log(err);
    })
});

//Get um funcionarios
//funcionarios/1
app.delete('/funcionarios/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM funcionarios WHERE ID = ?',[req.params.id],(err,rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete um funcionarios
/funcionarios/1
app.get('/funcionarios/:id',(req,res)=>{
    mysqlConnection.query('DELETE * FROM funcionarios WHERE ID = ?',[req.params.id],(err,rows, fields)=>{
        if(!err)
        res.send('dELETE ');
        else
        console.log(err);
    })
});