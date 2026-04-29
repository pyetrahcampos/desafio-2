# Desafio-2 - Sistema de Microsserviços

<h1>Estrutura de arquivos</h1>
<ul>
  <li><strong>Pagamento.js</strong>: Cuida do processo da venda, conecta ao banco e envia mensagem à fila.</li>
  <li><strong>Notificacao.js</strong>: Monitora a fila e dispara alertas assim que o pagamento é detectado.</li>
  <li><strong>Docker-compose.yaml</strong>: Orquestra os serviços do RabbitMQ e PostgreSQL.</li>
</ul>

<h1>Packages</h1>
<ul>
  <li><code>amqplib</code></li>
  <li><code>sequelize</code></li>
  <li><code>pg</code></li>
</ul>

<h1>Como rodar</h1>

<h2>1. Iniciar infraestrutura</h2>
Clone o repositório, abra o terminal na pasta raiz e suba os containers:
<p><code>docker-compose up -d</code></p>

<h2>2. Instalar dependências</h2>
É necessário entrar em cada pasta (pagamento e notificacao) e instalar os pacotes:
<p><code>npm install</code></p>

<h2>3. Executar os serviços</h2>
Abra dois terminais:
<ul>
  <li><strong>Terminal 1:</strong> <code>node Notificacao.js</code> (Ficará aguardando mensagens)</li>
  <li><strong>Terminal 2:</strong> <code>node Pagamento.js</code> (Enviará a mensagem e encerrará)</li>
</ul>

<h2>4. Monitoramento</h2>
Acesse o painel administrativo do RabbitMQ para ver as filas em tempo real:
<p>URL: <a href="http://localhost:15672">http://localhost:15672</a> | Usuário: <code>guest</code> | Senha: <code>guest</code></p>

<h2>5. Para encerrar o serviço</h2>
No terminal, utilize o comando:
<p><code>docker-compose down</code></p>
