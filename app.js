/* importar as configuracoes do servidor*/
const app = require('./config/server');

/* parametrizar a porta de escuta*/
const server = app.listen (3000, function () {
  console.log('Servidor Online')
})

const io = require('socket.io')(server);

app.set('io', io);

/* criar a conexao por websocket */
io.on('connection', function(socket){
    console.log('usario conectou');

    socket.on('disconnect', function(){
    console.log('usuario desconectou');
    });

    socket.on('msgParaServidor', function(data){

      /* dialogo  */
      socket.emit('msgParaCliente',
     {apelido: data.apelido, mensagem: data.mensagem}
      );

      socket.broadcast.emit('msgParaCliente',
     {apelido: data.apelido, mensagem: data.mensagem}
      );

      /*  participantes  */
      if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
      socket.emit('participantesParaCliente',
      {apelido: data.apelido}
       );

       socket.broadcast.emit('participantesParaCliente',
      {apelido: data.apelido}
       );
      }
    })
});
