O projeto será uma API open-source para descobrir o zodíaco baseado na data de nascimento de uma pessoa da forma mais acurada possível.

C:\ZodiacAPI
├── index.ts
├── package-lock.json
├── package.json
├── README.md
└── src
   ├── app.ts
   └── routes
      └── routes.ts

PLANEJAMENTO DE MÓDULOS

1. Birth
2. Zodiac
3. GeoData

PLANEJAMENTO 

Passo 1: Captura e Validação de Dados Geográficos
Você não pode calcular nada sem saber o ponto exato da Terra.
- O que fazer: Crie um fluxo para o usuário digitar a cidade de nascimento.
- O que pesquisar/procurar documentação: APIs de geocodificação (como OpenStreetMap Nominatim ou Google Places API) para transformar o nome da cidade em coordenadas de Latitude e Longitude.

Passo 2: O Desafio do Fuso Horário Histórico (Crucial)
O cálculo precisa ser em Hora Universal (UTC). Se alguém nasceu em 1985 em São Paulo, você precisa saber se estava em horário de verão ou qual era o fuso oficial daquele ano exato.
- O que fazer: Use as coordenadas (Lat/Long) e a data de nascimento para descobrir o fuso horário histórico.
- O que pesquisar/procurar documentação: Pesquise sobre a IANA Time Zone Database (a base que computadores usam para fusos antigos) e bibliotecas/APIs como tz-lookup ou a API do Google Time Zone.

Passo 3: Conversão para o Tempo Astronômico
A astronomia não conta o tempo em dias, meses e anos civis.
- O que fazer: Escreva ou use uma função para converter a data civil (já em UTC) para Data Juliana (Julian Date).
- O que pesquisar/procurar documentação: Estude o conceito de Julian Date (JD). Procure algoritmos ou fórmulas matemáticas de conversão do calendário Gregoriano para o calendário Juliano de Astronomia.

Passo 4: O Mecanismo de Efemérides (A Geometria do Céu)
Aqui está o coração do projeto. Você precisa calcular as coordenadas celestes do Sol.
- O que fazer: Integrar um motor matemático de efemérides no seu backend.
- O que pesquisar/procurar documentação: Leia sobre a Swiss Ephemeris (a biblioteca aberta mais precisa do mundo para isso). Busque a documentação do pacote correspondente para a sua linguagem (ex: swisseph no Node.js/C++). Você precisará entender a função que calcula posições planetárias em formato de Longitude Eclíptica.

Passo 5: Mapeamento Geométrico e Resposta da API
Com a Longitude Eclíptica em mãos (um número decimal de 0 a 360 graus):
- O que fazer: Crie a lógica matemática que pega esse ângulo, divide pelo tamanho de cada constelação simbólica (30 graus) e mapeia o índice resultante para o array de signos.
- O que pesquisar/procurar documentação: Conceitos de matemática básica de ciclo (operador de resto/módulo % e arredondamento para baixo Math.floor) para extrair tanto o signo quanto o grau exato da transição (cúspide).

BIBLIOTECAS NECESSÁRIAS

- node-geocoder com OpenStreetMap (Nominatim): biblioteca para geocodificação (transformar cidade em lat/lon)
- swisseph: calcula as coordenadas celestes do Sol
- tz-lookup: descobre o fuso horário de um local com base nas coordenadas de latitude e longitude
