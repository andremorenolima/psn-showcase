# 🎮 PSN Showcase

Um site pessoal e customizado para exibir jogos e troféus da PlayStation Network, construído com HTML, CSS, JavaScript puro e um script Node.js no back-end para coleta de dados.

## 📝 Sobre o Projeto

Este projeto foi criado para ser uma vitrine personalizada das minhas conquistas na PlayStation Network. Ele funciona em duas partes:

1.  **Script de Coleta (Back-end):** Um script em Node.js que utiliza a biblioteca `psn-api` para se conectar à PlayStation Network, buscar todos os dados de jogos e troféus de um perfil específico e salvá-los em um arquivo `games.json`.
2.  **Interface (Front-end):** Uma aplicação web estática, feita com HTML, CSS e JavaScript, que lê o arquivo `games.json` e renderiza as informações em uma interface amigável e interativa.

## ✨ Funcionalidades

* Listagem de todos os jogos de um perfil da PSN.
* Visualização detalhada dos troféus de cada jogo (incluindo raridade e data).
* Geração de páginas ou seções dinâmicas para cada jogo com base nos dados coletados.
* Design limpo e responsivo para visualização em desktop e mobile.

## 🛠️ Tecnologias Utilizadas

* **Front-end:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
* **Back-end (Script):**
    * Node.js
* **Pacote Principal:**
    * [psn-api](https://github.com/achievements-app/psn-api) (para interagir com a API da PlayStation Network)

## 🧠 O que aprendi

Este projeto foi uma excelente oportunidade para aprofundar meus conhecimentos em diversas áreas, conectando o back-end e o front-end de uma aplicação de forma prática.

* **Automação com Node.js:** Criar scripts para tarefas de back-end, como o consumo de APIs de terceiros e a manipulação de dados em formato JSON.
* **JavaScript Assíncrono:** Utilizar `async/await` de forma prática para lidar com as requisições à API da PSN, gerenciando o fluxo de dados de forma eficiente.
* **Manipulação do DOM com JavaScript Puro:** Renderizar dinamicamente o conteúdo da página, criando elementos HTML a partir dos dados do JSON, sem o uso de frameworks.
* **Consumo de Dados no Front-end:** Utilizar a `Fetch API` para carregar e processar o arquivo JSON local, disponibilizando os dados para a aplicação.
* **Gerenciamento de Credenciais:** Proteger informações sensíveis, como tokens de API e IDs, utilizando variáveis de ambiente com um arquivo `.env`.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

* Você precisa ter o [Node.js](https://nodejs.org/) (versão 16 ou superior) instalado.
* Um token `npsso` da sua conta PSN. Você pode obter o seu seguindo [este guia](https://github.com/achievements-app/psn-api#readme).

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/psn-showcase.git](https://github.com/seu-usuario/psn-showcase.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd psn-showcase
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure suas credenciais:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione seu token `NPSSO` e `AccountId`:
    ```
    NPSSO="seu_token_npsso_aqui"
    AccountId="sua_account_id_aqui"
    ```

5.  **Execute o script para buscar os dados:**
    Este comando irá rodar o script que busca os dados da PSN e cria o arquivo `games.json`.
    ```bash
    node fetch-data.mjs
    ```    

6.  **Visualize o site:**
    Após a execução do script, basta abrir o arquivo `index.html` no seu navegador para ver o resultado!

    ```bash
    # (Opcional) Use uma extensão como o "Live Server" no VS Code para uma melhor experiência.
    ```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.