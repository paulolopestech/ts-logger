# Logger
Uma aplicação de logs escrita em Typescript que gerencia logs de várias aplicações conectadas. O Logger utiliza conexões WebSocket para receber logs, armazená-los em um banco de dados MongoDB e transmitir as informações para dashboards.

[Frontend](https://github.com/paulolopestech/logger-ts-frontend)

## Funcionalidades
- <b>Integração WebSocket:</b> Dois servidores WebSocket, um na porta 3002 para receber logs e outro na porta 3003 para enviar dados para dashboards.

- <b>Banco de Dados MongoDB:</b> Armazena documentos de log de maneira eficiente para análise e recuperação posterior.

- <b>Servidor HTTP Express:</b> Executa na porta 3001, tratando rotas para receber e retornar dados para dashboards.

- <b>Log de Conexão</b> Registra logs no banco de dados e os envia para dashboards conectados via WebSocket (porta 3003).

- <b>Alertas em Tempo Real:</b> Avalia mensagens de log, as prioriza e envia alertas (potencialmente por e-mail com base na prioridade), transmitindo logs para dashboards conectados.

- <b>Tratamento de Perda de Conexão:</b> Registra alertas críticos no banco de dados e notifica dashboards e assinantes de e-mail usando AWS SES ao perder a conexão com uma aplicação.

## Prerequisites
- Node.js instalado
- MongoDB instalado e em execução
- Credenciais da AWS SES configuradas para notificações por e-mail

## Instalação

1. Clone o repositório:
```
git clone git@github.com:paulolopestech/logger.git
```

2. Instale as dependências:
```
npm install
```

## Configuração
### Configure o MongoDB:

Certifique-se de que o MongoDB está em execução.

Configure as opções de conexão do MongoDB em src/infra/config/database/database.ts.
### Configure a AWS SES:

Configure as credenciais e configurações do SES em src/infra/config/mailer.ts.

## Uso
### Desenvolvimento
Execute o servidor de desenvolvimento:
```
npm run start:dev
```


## Produção
Builde e inicie o servidor de produção:
```
npm start
```

## Registro de Logs
Para registrar mensagens, conecte-se ao servidor WebSocket em execução na porta 3002. O Logger armazenará e processará os logs com base em seu conteúdo e prioridade.

## Contribuições
Sinta-se à vontade para contribuir abrindo problemas ou enviando solicitações de pull.

## License
Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](./LICENCE) para obter detalhes.

## Acknowledgments
Inspirado pela necessidade de gerenciamento eficiente e em tempo real de logs em sistemas distribuídos.

Construído com Typescript, Express, MongoDB e WebSocket para um desempenho robusto.

AWS SES usado para notificações por e-mail confiáveis.

Projeto desenvolvido, inicialmente, para a tarefa final da disciplina de Engenharia de Software do Instituto Nacional de Telecomunicações.