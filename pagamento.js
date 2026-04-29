const amqp = require('amqplib');

async function enviarMensagem() {
    try {
        
        const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
        const channel = await connection.createChannel();

        const fila = 'fila_notificacoes';
        const mensagem = 'Pedido Recebido!';

        
        await channel.assertQueue(fila, { durable: false });

        
        channel.sendToQueue(fila, Buffer.from(mensagem));

        console.log(" [x] Mensagem enviada para o RabbitMQ: '%s'", mensagem);

        
        setTimeout(() => {
            connection.close();
        }, 500);

    } catch (error) {
        console.error("Erro ao conectar no RabbitMQ:", error);
    }
}

enviarMensagem();
