# Middlewares com Express: boas-práticas

# O que vamos aprender

- O que é o Express
- O que é um middleware
- Quando utilizar middlewares
- Boas-práticas de implementação

---

# Após assimilar este conteúdo, você será capaz de:

- Manipular os principais recursos de rotas do Express
- Construir seus próprios middlewares
- Entender, ajustar e melhorar middlewares que já estiverem implementados
- Avaliar quando eles se aplicam no contexto de uma API

---

# Por que isso é importante

- O Express é um dos *frameworks* mais utilizados para gerenciamento de rotas no Node.js e seu funcionamento é todo baseado em middlewares;
- Grande parte das aplicações construídas com Node.js e Express utilizam desse conceito para controle de acesso (usuários autenticados e não-autenticados), gestão de permissões (*roles*) e muitas outras validações;
- Segurança é uma premissa básica de qualquer *software* de mercado e a aplicação de middlewares é uma forma simples de deixar nosso sistema mais protegido;
- APIs que são expostas na *internet* e que não possuem, no mínimo, essa camada de segurança ficam extremamente vulneráveis a ataques maliciosos ou até utilização indevida.

---

# Conteúdo

## O que é o Express?

Antes de entendermos o que é um middleware, é muito importante que tenhamos um conceito prévio do que é o Express e como esses dois componentes interagem para atender as requisições de uma API com Node.

Imagine que você pretende construir uma funcionalidade na sua aplicação que retorna uma lista de produtos. Como já aprendemos, cada requisição feita à nossa aplicação irá trafegar pela rede, chegar até o servidor, passar pelo respectivo caminho dentro da API e retornar uma resposta, certo? Em termos simples, o Express é o responsável pelas "estradas” que vão existir dentro da aplicação e por conduzir cada requisição ao seu destino correto.

Tecnicamente falando, o Express é um *framework* capaz de gerenciar requisições HTTP de uma forma simples e performática, além de possibilitar um tratamento de exceções bem completo.

Mas onde os middlewares entram na história? Todo o fluxo para que uma requisição seja processada dentro do Express é baseado em middlewares.

## O que é um middleware no Express?

Dito de forma simples, middlewares são funções que realizam a interceptação e manipulação de requisições.

O raio de atuação dos middlewares se dá justamente no meio, ou entre, uma requisição e uma resposta.

Para entender melhor o conceito, imagine que você está participando de um processo seletivo, aqui na Trybe mesmo. Imaginou? Esse processo tem **(1) etapas**. Em cada etapa, alguns **(2) requisitos são avaliados**, como se alguém “interceptasse” o resultado de cada conversa e avaliasse as anotações. Se tudo estiver de acordo com o esperado, o processo avança. Porém, **(3) se algum requisito não for satisfeito, o processo é interrompido**. Além disso, as **(4) informações são repassadas de um avaliador para outro** sobre o seu desempenho, fornecendo uma visão geral sobre você. Essas **(5) informações podem sofrer alterações** durante o repasse. Por fim, (**6) tudo isso só começou porque você aplicou para a vaga, e, no final do processo, a Trybe, que tem o controle de aprovar ou recusar a sua candidatura, te enviará uma resposta**.

Mas o que isso tem a ver com a ideia de um middleware?

Da mesma forma, quando utilizamos Node.js juntamente com o Express, uma requisição pode passar por **(1) diferentes etapas de validação**, de acordo com as regras que foram estabelecidas; **(2) alguns requisitos pré-estabelecidos serão validados em cada etapa** e, se satisfeitos, o fluxo prossegue. Mas, **(3) se alguma condição obrigatória não atender aos padrões esperados, essa requisição é interrompida**. As (**4) informações da requisição são repassadas para as etapas seguintes** e **(5) podem sofrer alterações**. Finalizando, **(6) esses middlewares têm acesso às características da requisição que foi disparada e o controle da resposta final**.

Veja um exemplo de implementação básica:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/beca9dc1-1ce4-48c8-bd69-aaf62b8ca592/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023118Z&X-Amz-Expires=86400&X-Amz-Signature=ba17d6760026b8c928fb40d2aa9b34338c0b043c03591264d54dd8eaeb80db0d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Como mostra o exemplo acima, um middleware, no Express, recebe três parâmetros:

- `request`: contém os dados da requisição feita pelo usuário;
- `response`: contém os métodos de resposta que poderão ser enviadas ao usuário;
- `next`: é o responsável por permitir que uma requisição prossiga seu fluxo.

Utilizando-se dessas 3 propriedades-padrão que o Express oferece, podemos criar inúmeros outros middlewares personalizados e com diferentes arquiteturas.

### Parâmetro `request`

Como já foi dito, dentro do `request` temos formas de acessar as informações enviadas pelo usuário.

Os tipos mais comuns de parâmetros são:

- `Route Params`: parâmetros obrigatórios de **rota**, geralmente utilizados para buscar ou identificar um registro específico;
- `Query Params`: parâmetros opcionais de **busca**, geralmente utilizados para paginação ou para filtrar uma busca, porém de forma não-obrigatória;
- `Body`: **corpo** da requisição, geralmente utilizado quando queremos inserir ou atualizar registros.

### Parâmetro `response`

Para emitir uma resposta ao usuário, de acordo com as validações que executarmos, temos algumas opções, sendo as mais comuns:

- Método `Send`
    - `return response.send('Sua mensagem’);`
        - Esse método envia uma mensagem para o usuário em formato de **texto;**
- Método JSON
    - `return response.json({ message: 'Sua mensagem’});`
        - Já o método `.json` envia uma mensagem, em forma de **objeto**, para o usuário. Esse padrão é o mais adotado pela comunidade e é tido como uma boa-prática.

### Parâmetro `next`

Esse terceiro e último parâmetro de uma requisição com Express é o que fecha o conceito de middleware.

Quando ele é chamado, nossa aplicação entende que todos os critérios foram satisfeitos e permite que o fluxo prossiga como planejado.

Ele sempre deve ser chamado como uma função, da seguinte forma: `next()`;

### Implementação básica de um middleware

Agora vamos ver, por meio de um exemplo prático, as operações primárias de um middleware básico.

Nosso usuário utilizará uma rota da API para consulta de produtos. Porém, antes de receber a lista, teremos uma etapa de validação, para verificar se ele tem a permissão de administrador para obter esse acesso:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/63bc1396-86be-430f-8489-58a6b634a021/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023250Z&X-Amz-Expires=86400&X-Amz-Signature=52084fe4c6acaa70a1b0415c7cde005407fcaffa46e7d4a3acb4845e204f2b21&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Note que estamos obtendo o nível de acesso do usuário por meio de `Route Params`, pelo parâmetro `:userLevel` (linhas 5 e 6), e validando se ele satisfaz o requisito de ser do tipo `adm` ou não (linha 8). 

Se a condição de `userLevel` não for atendida corretamente, o usuário receberá uma resposta, do tipo JSON, indicando qual o motivo do erro (linhas 8 a 12).

Se essa validação for bem-sucedida, faremos duas coisas:

1. Criar uma subpropriedade dentro do nosso `response`, chamada `permission`, atribuindo um valor a ela. Essa propriedade poderá ser acessada por qualquer uma das etapas seguintes dessa requisição (linha 13)
2. Chamar a função `next()`, indicando que a requisição pode prosseguir normalmente (linha 15)

Agora vamos continuar observando o fluxo da nossa requisição:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9df274ae-d445-445e-a480-dbf40ea8a0c4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023332Z&X-Amz-Expires=86400&X-Amz-Signature=0f1e7dd4de44a7711b69475772f7e9ee457c0db0455cb7f507ad902d418bd4d9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Caso a primeira etapa seja bem-sucedida, teremos o seguinte comportamento:

- Emitiremos uma resposta de sucesso, do tipo JSON, contendo:
    - A mensagem de permissão que foi definida na etapa anterior, em nosso middleware;
        
        > Perceba que conseguimos acessar essa mensagem por meio da propriedade `response.permission`, criada anteriormente.
        > 
    - A lista **fictícia** de produtos.

Pronto! Acabamos de criar nosso primeiro middleware!

Veja como ficou nosso arquivo completo:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/90fac528-44ed-4ba6-98fe-1b52da8d629c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023350Z&X-Amz-Expires=86400&X-Amz-Signature=75a93fa1d3b5d87a7e5ad22b750230977babae1e7842c06bd20ba931efe5e5f8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

### Implementação intermediária de um middleware

Se quisermos deixar a implementação do nosso middleware um pouco mais refinada, podemos fazer o seguinte:

- Separá-lo em uma função, que recebe os três parâmetros já mencionados: `request`, `response` e `next`;
- Realizar o procedimento de validação dentro dessa função.

Veja o exemplo abaixo:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/41ca76c2-b939-47df-a55d-4237b7c07dde/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023420Z&X-Amz-Expires=86400&X-Amz-Signature=da76e3db330406ecbae720bbb05064da0a2b6d4db2567b04f11e811340b89b3f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Para que esse middleware tenha efeito sob a rota indicada, ele deverá ser passado como segundo parâmetro (linha 16), como na imagem:

![Untitled](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e70ed6e5-a493-4ca7-9490-453f0e3695b7/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220901T023436Z&X-Amz-Expires=86400&X-Amz-Signature=74192962a2744c3380f4e73ddd870bf6780171a8b249863932d284ecb051da1e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

Mas tão importante quanto entender e construir um middleware é saber **quando** ele deve ser utilizado.

## Quando utilizar?

Podemos utilizar um middleware para realizar qualquer validação ou tratamento de informações em uma requisição. Segue alguns exemplos comuns:

- Validar se um usuário está autenticado para acessar uma rota protegida;
- Validar se um usuário tem permissão para executar a operação solicitada (criar, editar, deletar ou visualizar).

## Boas-práticas na implementação de middlewares

Para que um middleware cumpra sua função e nos traga apenas soluções e não problemas, algumas boas-práticas devem ser levadas em consideração:

## Nomenclatura

Um princípio básico que podemos pensar é sobre nomenclatura. Como vimos, um middleware, por padrão, recebe três parâmetros. Nomeá-los de maneira clara e por extenso deixa o nosso código mais legível e claro para qualquer pessoa que venha a ler no futuro. Por isso, evite abreviações como `req` e `res`, por exemplo, preferindo termos como `request` e `response`.

### Responsabilidade única

O ideal é que um middleware tenha uma única responsabilidade de validação ou tratamento de requisição.

Pode ser que você pense: “Mas por que eu não posso economizar código e tempo já validando tudo o que preciso no mesmo lugar?". Pelo simples motivo de que um middleware pode ser utilizado em diferentes rotas da sua API, **e não necessariamente todas as validações serão aplicáveis da mesma forma em todas elas.

Quando construímos componentes de responsabilidade única, a reutilização de código e aproveitamento de tempo é bem maior, porque esse componente se torna modular e especialista, ao invés de ser genérico ou muito acoplado com outras regras. 

### Parametrização

Quando um componente é construído de forma parametrizável, nosso código fica mais limpo, escalável, e o volume de manutenções cai drasticamente. 

Além disso, ele pode ser utilizado por um número ainda maior de partes do sistema, aumentando a produtividade e velocidade de entrega, o que diferencia um desenvolvedor no mercado de trabalho, hoje em dia.

O que seria um middleware parametrizado, então? 

Seria um middleware que não tem os valores de comparação escritos diretamente no código, mas que os recebe no momento em que é chamado ou que consulta esses parâmetros em uma base de dados.

### Bom-senso

Mesmo a água sendo essencial para uma boa saúde, em excesso, ela pode se tornar tóxica, sabia? Da mesma forma, utilizar middlewares sem necessidade ou de forma abusiva pode tornar seu código lento e pouco performático.

É como se, em um supermercado, houvesse um único funcionário operando o caixa em horários de pico: o tempo de espera e insatisfação das pessoas seria grande!

Se criarmos middlewares desnecessários ou sem levar em conta a volumetria de acessos, nossas requisições terão uma tendência à lentidão, e isso pode prejudicar muito a experiências dos usuários.

### Baixo acoplamento

Todo e qualquer componente de uma aplicação, incluindo os middlewares, devem ser o mais desacoplados de bibliotecas terceiras possível. Por quê? Porque bibliotecas mudam com frequência e pode ser que o seu time decida mudar a forma de acesso ao banco de dados, por exemplo. Se o middleware estiver total e diretamente ligado a essa biblioteca, ele pode sofrer grandes alterações e afetar outras partes do sistema.

Infelizmente, isso nem sempre será possível, mas busque aplicar sempre que for viável na arquitetura da sua solução.

### Tratamento de exceções personalizado

É horrível quando consumimos APIs de terceiros e o servidor nos retorna um erro do tipo 500, com uma mensagem nada descritiva, não é? Por isso, criar um tratamento de erros e exceções personalizado, onde o *status code* e a mensagem são compatíveis com a regra validada, torna a experiência dos usuários bem mais agradável, além de integrar muito bem com um front-end que exibe mensagens de erro dinâmicas para seus clientes.

### Aplicação global de middlewares compartilhados

Geralmente, em uma API Node.js, as rotas ficam separadas por escopo, de acordo com seus casos de uso. Quando todas as rotas de um escopo utilizam o mesmo middleware, o ideal é que ele seja aplicado diretamente no componente de Router(), ao invés de individualmente.

## Conteúdo em vídeo

Para tudo ficar mais claro, assista ao vídeo que gravamos, aplicando alguns dos princípios mencionados acima:

[Clique aqui para visualizar o vídeo](https://deciduous-result-609.notion.site/Express-Middlewares-globais-bbbc4543cedc4ce884ce1c6602f7a4db)

[![Vídeo](https://img.youtube.com/vi/5NHqHr_WP7Q/0.jpg)](https://www.youtube.com/watch?v=5NHqHr_WP7Q)

## Exercícios

1. Qual das implementações abaixo segue princípios de boas-práticas na implementação de middlewares?
    1. `app.get('/', validateUserLevelAndAuthentication, (request, response) => {`
    2. `app.get('/', validateUserLevel, ensureAuthenticated, (request, response) => {`
2. Explique, em suas palavras, a relação entre o Express e o conceito de middlewares.
    - …
3. Em que situação abaixo listada o uso de middlewares é dispensável:
    1. Validar se o usuário é do tipo "admin”
    2. Validar se o usuário tem permissão de edição para a entidade Produtos
    3. Mapear o corpo de uma requisição e converter a propriedade `value` (valor monetário) de cada Produto para o tipo de valor BRL
    4. Validar se o usuário está autenticado

## Gabarito

1. Opção B
2. O Express processa e valida as requisições HTTP por meio de funções de middlewares
3. Opção C

## Exercícios bônus

1. Marque a opção FALSA sobre o que um middleware pode ou não fazer:
    1. Um middleware não pode alterar as informações do cabeçalho da requisição
    2. Um middleware pode alterar as informações do cabeçalho da requisição
    3. Um middleware pode acessar as propriedades da `request`
2. Se um mesmo middleware será utilizado em todas as sub-rotas de determinado escopo, qual seria a melhor forma de implementá-lo?
    1. `app.get('/', ensureAuthenticated, (req, res) => {…`
    2. `app.use(ensureAuthenticated);`

## Gabarito - Exercícios bônus

1. Opção A
2. Opção B

---

# Recursos adicionais
- Veja a [documentação oficial do express](https://expressjs.com/).
- E também [mais detalhes sobre middlewares com Express](https://expressjs.com/pt-br/guide/using-middleware.html).
