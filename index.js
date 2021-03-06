const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'coti',
    database: 'nodeDB', //Nome do Banco
    multipleStatements: true
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
app.get('/funcionarios/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM funcionarios WHERE ID = ?',[req.params.id],(err,rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Delete um funcionarios
app.delete('/funcionarios/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM funcionarios WHERE ID = ?',[req.params.id],(err,rows, fields)=>{
        if(!err)
        res.send('Deletado com sucesso ');
        else
        console.log(err);
    })
});

//Inserindo um funcionarios
app.post('/funcionarios',(req,res)=>{
    let emp = req.body;
    var sql = "SET @ID = ?;SET @NOME =?; SET @SALARIO =?; \
    CALL FuncionariosAddOrEdit(@ID,@NOME,@SALARIO);"; 
    mysqlConnection.query(sql,[emp.ID,emp.NOME,emp.SALARIO],[req.params.id],(err,rows, fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('Insira o funcionario id: '+element[0].ID );
            
        });
        //res.send(rows);
        else
        console.log(err);
    })
});

//atualiza um funcionarios
app.put('/funcionarios',(req,res)=>{
    let emp = req.body;
    var sql = "SET @ID = ?;SET @NOME =?; SET @SALARIO =?; \
    CALL FuncionariosAddOrEdit(@ID,@NOME,@SALARIO);"; 
    mysqlConnection.query(sql,[emp.ID,emp.NOME,emp.SALARIO],[req.params.id],(err,rows, fields)=>{
        if(!err)
       res.send('atualiza com sucesso');
        
        else
        console.log(err);
    })
});