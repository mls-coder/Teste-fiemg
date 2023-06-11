Bem vindos! 

Seguem instruções para execução do projeto:

1 - Versão do Node: v16.14.0
2 - Banco de dados:
    MySql. Criar um banco de dados e definir suas configurações de conexão no arquivo .env de acordo com o .env de exemplo.

3 - Execução do teste:
    Executar yarn
    Executar yarn start
    Realizar uma chamada no path /auth, com o body "key" = JWT_SECRET, username = JWT_USERNAME. Ambos os campos JWT são configurados no .env da aplicação.
    Copiar o valor do token retornado e configurar como Header_Authorization para autorizar a chamada a outras rotas.

4 - Parte 1 do teste:
    Executar a rota user/register, com o body email/password para criar o usuário.
    Executar a rota user/login, com o email/password já criados
    Executar a rota universities para retornar todas as universidades

5 - Parte 2 do teste:
    Executar rotas conforme documentação.
    

