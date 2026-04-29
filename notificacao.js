const amqp = require('amqplib');

async function ouvirFila() {
    try {
        // 1. Conecta no RabbitMQ (Docker)
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const fila = 'fila_notificacoes';

        // 2. Garante que a fila existe (importante caso esse serviço suba antes do outro)
        await channel.assertQueue(fila, { durable: false });

        console.log(" [*] Aguardando mensagens na fila '%s'. Para sair, pressione CTRL+C", fila);

        // 3. O "Consumidor": Toda vez que chegar uma mensagem, essa função abaixo roda
        channel.consume(fila, (msg) => {
            if (msg !== null) {
                const conteudo = msg.content.toString();
                
                console.log(" -----------------------------------------");
                console.log(" [!] NOTIFICAÇÃO RECEBIDA: %s", conteudo);
                console.log(" [v] Enviando alerta ao usuário... (Sucesso)");
                console.log(" -----------------------------------------");

                // Avisa ao RabbitMQ que a mensagem foi lida e pode ser descartada
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error("Erro no Serviço de Notificação:", error);
    }
}

ouvirFila();