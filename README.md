# SERVER API RESTFUL CORE

## Sobre o que seria esse projeto ? 

Bom, de forma resumida seria uma `API` usando apenas os `core modules` (módulos nativos do nodejs). Mas por que eu preciso saber disso ? O express já não me dá tudo de mão beijada ? Pois é, por esse motivo que fiz esse projeto, para ser sincero, fazer esse projeto foi bem mais complicado do que parece; O motivo é que existe pouco conteúdo falando sobre como funciona realmente as `core modules` e seus benefícios. Por isso resolvi criar uma `API` que possa ser entendida pela maioria dos programadores que conhecem e sabem como funciona um sistema nodejs.

## Quais dos core modules foram usados ? 

* ***http***
* ***fs***
* ***path***
* ***crypto***
* ***Buffer***

Todos os 5 módulos contém peculiaridades que foram usadas de forma única no projeto.

## O que essa API faz ?

De forma clara, é uma `API` de criação, edição, atualização e consulta de heróis e usuários.

Por exemplo, para mexer no endpoint de heróis, você precisa primeiro criar uma conta no endpoint de usuários, ao criar um usuário você receberá um `ID` e um `token` o ID é fundamental caso você queira fazer uma exclusão de sua conta ou edição. O token serve para dar autorização para mexer no endpoint de heróis, ou seja, sem o token você não pode fazer consulta ou qualquer outra finalidade no endpoint dos heróis.

Obs. Tem a opção de login caso esqueça o token ou id.   

## Sistema de Rotas

## /heroes

| HTTP 	 | ROUTE       | BODY | DESCRIÇÃO |
| ---  	 | ------ 		 | ------ |  ------ |
| GET  	 | /heroes/?id | TOKEN (Bearer) | Rota para consulta de heróis, também pode ser usada com id de herói em específico. **statusCode(200 | 401)**
| POST 	 | /heroes 		 | JSON (age: number, power: string|array, name: string) TOKEN (Bearer) | Esta rota é a de criação de heróis. **statusCode(201 | 400 | 401 | 409)** 
| PUT 	 | /heroes/id  | JSON (age: number, power: string|array name: string) TOKEN (Bearer)| Esta rota é a de edição de heróis. **statusCode (202 | 401 | 409)**
| DELETE | /heroes/id  | TOKEN(Bearer) | Rota de exclusão de heróis. **statusCode(202 | 401 | 409)**

## /users

| HTTP 	 | ROUTE       | BODY | DESCRIÇÃO |
| ---  	 | ------ 		 | ------ |  ------ |
| POST 	 | /users 		 | JSON (name: string, email: string, password: string) | Esta rota é a de criação de usuários. **statusCode(201 | 400 | 409)** 
| PUT 	 | /users/id  | JSON (name: string, email: string, password: string) TOKEN (Bearer)| Esta rota é a de edição de usuários. **statusCode (202 | 401 | 409)**
| DELETE | /users/id  | TOKEN(Bearer) | Rota de exclusão de usuários. **statusCode(202 | 401 | 409)**

## /login 

| HTTP 	 | ROUTE       | BODY | DESCRIÇÃO |
| ---  	 | ------ 		 | ------ |  ------ |
| GET 	 | /login 		 | JSON (email: string, password: string) | Esta rota é a de login. **statusCode(200 | 400 | 409)** 

## /default 

Obs. Qualquer rota que não seja as mencionadas acima, será redirecionado para á página `/default`


## ***Glossário***

> API: ***Serviço Back-end que faz parte lógica com banco de dados, serviços ou afins que gera um JSON para o Front-end***

> endpoint: ***Sabe as rotas como `/users` elas são endpoint, elas servem como guia para cada finalidade do projeto***

> Core Modules ***Os core modules são a essência do nodejs, sem ele não existiria a infinidade de pacotes que existe para node hoje (inclusive o próprio express) todos os core modules estão na documentação oficial do node `link:`https://nodejs.org/dist/latest-v16.x/docs/api/ ***

>RESTFUL: ***Termo usado na criação de APIS com protocolo REST, Os mais importantes são: 
* Use `status` referentes a cada requisição ou resposta 
* Use `methods` a sua respectiva função (POST: CRIAR, PUT: EDITAR, DELETE: DELETAR, GET: CONSULTAR)
***
