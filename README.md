# EscolarBus Mobile 🚌📱

**Projeto Final — Disciplina de Gestão da Qualidade de Software**  


O **EscolarBus Mobile** é uma aplicação multiplataforma desenvolvida em React Native e Expo projetada para mitigar o tempo de espera de estudantes em pontos de ônibus na região de Maceió/AL. O aplicativo consome dados de geolocalização em tempo real de uma API de simulação rodoviária externa, plotando rotas precisas na malha viária real e fornecendo cronogramas dinâmicos de paradas.

---

##  Funcionalidades Principais

*   **Rastreamento com GPS em Tempo Real:** Renderização contínua do marcador do veículo no mapa através de requisições de ciclo curto.
*   **Rotas Dinâmicas Baseadas em Pistas Reais:** Traçados geométricos fiéis ao asfalto gerados através do ecossistema OSRM (*Open Source Routing Machine*).
*   **Painel de Horários e Paradas Inteligente:** Adaptação completa da interface (nomes de pontos, status e horários previstos) indexada dinamicamente pelo ID da linha selecionada.

---

##  Stack Utilizada no Projeto

*   **Ambiente Mobile:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/) (Arquitetura gerenciada e roteamento via `expo-router`).
*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Garantindo tipagem estática, segurança em tempo de compilação e refatorações limpas).
*   **Renderização de Mapas:** `react-native-maps` integrado nativamente ao Google Maps Provider (Android) e Apple Maps (iOS).
*   **Cliente HTTP:** Fetch API nativa configurada com tratamento de concorrência e injeção de parâmetros dinâmicos anti-cache.

---

##  Frontend e Fluxo Dinâmico

A tela de monitoramento principal (`Horarios.tsx`) captura dinamicamente a rota selecionada pelo painel de linhas do usuário utilizando propriedades do `useLocalSearchParams()`. 

Uma vez mapeada a linha ativa, o sistema realiza as seguintes ações coordenadas:
1. **Dicionário Local (`DADOS_DAS_LINHAS`):** Renderiza imediatamente o cronograma estático com os nomes de ruas, paradas locais e horários previstos específicos daquela linha de Maceió.
2. **Ciclo de Efeito (`useEffect`):** Inicia um temporizador global na abertura do modal de mapas, despachando requisições assíncronas para a API hospedada em nuvem.
3. **Atualização Dinâmica:** O payload contendo a latitude/longitude do veículo e a geometria da pista é injetado diretamente no estado do componente, redesenhando os marcadores e a linha do trajeto instantaneamente.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
*   Node.js instalado (versão LTS recomendada).
*   Expo Go instalado no seu dispositivo móvel (ou emulador configurado no Android Studio/Xcode).

### 1. Clonar o Repositório
```bash
git clone git@github.com:felps1996/EscolarBus.git
cd final-project-app

```

### 2. Instalar as dependências

``` bash
npm install

```

### 3. Iniciar o servidor de desenvolvimento do Expo Go

``` bash
npx expo start

```
