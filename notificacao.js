const amqp = require('amqplib');

async function ouvirFila() {
    try {
     
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const fila = 'fila_notificacoes';

      
        await channel.assertQueue(fila, { durable: false });

        console.log(" [*] Aguardando mensagens na fila '%s'. Para sair, pressione CTRL+C", fila);

        
        channel.consume(fila, (msg) => {
            if (msg !== null) {
                const conteudo = msg.content.toString();
                
                console.log(" -----------------------------------------");
                console.log(" [!] NOTIFICAÇÃO RECEBIDA: %s", conteudo);
                console.log(" [v] Enviando alerta ao usuário... (Sucesso)");
                console.log(" -----------------------------------------");

             
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error("Erro no Serviço de Notificação:", error);
    }
}

ouvirFila();
