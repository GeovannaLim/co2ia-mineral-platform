# CØ2.IA Mineral Intelligence Platform

> Inteligência geoespacial assistida por IA para exploração mineral e regeneração ambiental

**Dados Satelitais** • **Análise Geoespacial** • **Inteligência Mineral** • **Camada Ambiental** • **Relatórios Interativos**

---

## Visão Geral

**CØ2.IA Mineral Intelligence** é uma plataforma experimental que demonstra como dados satelitais e análise geoespacial podem apoiar decisões estratégicas em exploração mineral.

O sistema transforma coordenadas geográficas em relatórios estruturados de inteligência mineral, combinando:

- análise de imagens de satélite
- indicadores geoespaciais
- scoring de potencial mineral
- inteligência ambiental e regeneração territorial

A plataforma foi desenvolvida como camada demonstrativa interativa do ecossistema CØ2.IA.

> ⚠️ **Importante:** Este repositório contém apenas a interface demonstrativa e o fluxo de geração de relatórios.
>
> Os algoritmos proprietários de inteligência mineral utilizados pela CØ2.IA **não estão incluídos** neste repositório.
>
> **Status:** Plataforma demonstrativa / protótipo de produto. Não é produção.

---

## Capacidades da Plataforma

A plataforma demonstra como equipes de exploração podem interagir com o sistema CØ2.IA.

**Principais funcionalidades:**

- 🛰️ **Interface de Análise Geoespacial** — Inserção de coordenadas geográficas para análise territorial.
- 📊 **Relatórios de Inteligência Mineral** — Geração de relatórios estruturados para diferentes minerais.
- 🌱 **Camada de Inteligência Ambiental** — Indicadores ambientais integrados à análise mineral.
- 🗺️ **Visualização Territorial Interativa** — Mapas interativos mostrando áreas analisadas e zonas prioritárias.
- 📄 **Geração Automática de Relatórios** — Exportação de relatórios técnicos em formato PDF.

---

## Módulos Minerais Suportados (Demo)

A interface demonstra múltiplos módulos de análise mineral.

| Mineral  | Módulo de Análise    |
| -------- | -------------------- |
| Ouro     | Gold Intelligence    |
| Cobre    | Copper Intelligence  |
| Ferro    | Iron Intelligence    |
| Bauxita  | Bauxite Intelligence |
| Diamante | Diamond Intelligence |

Cada módulo simula a estrutura da pipeline analítica completa utilizada pela CØ2.IA.

---

## Arquitetura

A plataforma foi projetada em uma arquitetura de três camadas, separando interface, geração de relatórios e motor analítico.

```
┌───────────────────────────────────────────────┐
│         Fontes de Dados Satelitais            │
│      Sentinel • Indicadores Geoespaciais      │
└───────────────────────────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│      Motor Proprietário CØ2.IA (Privado)      │
│                                               │
│  • Detecção de anomalias espectrais           │
│  • Scoring de potencial mineral               │
│  • Indicadores de regeneração ambiental       │
│  • Extração de features geoespaciais          │
└───────────────────────────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│      Camada Demonstrativa da Plataforma       │
│                                               │
│  • Dashboard interativo                       │
│  • Geração de relatórios                      │
│  • Visualização em mapas                      │
│  • Módulos minerais                           │
│  • Camada ambiental                           │
│  • Exportação de PDF                          │
└───────────────────────────────────────────────┘
```

---

## Estrutura do Projeto

```
src
├── components
│   ├── dashboard
│   ├── layout
│   ├── regeneration
│   ├── report
│   ├── shared
│   └── ui
│
├── pages
│   ├── Dashboard.jsx
│   ├── GenerateReport.jsx
│   ├── Reports.jsx
│   ├── ReportView.jsx
│   └── RegeneracaoAmbiental.jsx
│
├── entities
│   └── Report
│
├── integrations
└── utils
```

---

## Início Rápido

**Clone o repositório:**

```bash
git clone https://github.com/seuusuario/co2ia-mineral-intelligence-demo.git
cd co2ia-mineral-intelligence-demo
```

**Instale as dependências:**

```bash
npm install
```

**Execute o servidor de desenvolvimento:**

```bash
npm run dev
```

**Abra no navegador:**

```
http://localhost:3000
```

---

## Fluxo de Uso

Exemplo de utilização da plataforma:

1️⃣ Abrir o dashboard  
2️⃣ Inserir coordenadas geográficas da área de interesse  
3️⃣ Selecionar o mineral para análise  
4️⃣ Gerar o relatório  
5️⃣ Visualizar os resultados geoespaciais  
6️⃣ Exportar o relatório em PDF

---

## Camada de Inteligência Ambiental

A plataforma integra indicadores ambientais juntamente com a análise mineral.

**Indicadores ambientais incluídos:**

- Índice de Vegetação
- Saúde do Solo
- Proximidade de Recursos Hídricos
- Indicadores de Biodiversidade
- Potencial de Carbono

Esses indicadores ajudam a avaliar o contexto ecológico do território analisado.

---

## Estrutura dos Relatórios

Cada relatório inclui:

- visão geral do território
- indicadores de potencial mineral
- zonas geoespaciais prioritárias
- camada de inteligência ambiental
- análises estatísticas
- insights estratégicos
- conclusão executiva

Os relatórios são gerados em PDF técnico multipágina.

---

## Nota sobre Propriedade Intelectual

Este repositório **não inclui** o motor analítico proprietário da CØ2.IA.

Os seguintes componentes foram propositalmente omitidos:

- algoritmos de prospecção mineral
- pipelines de processamento satelital
- modelos de machine learning
- sistemas proprietários de scoring geoespacial

Esses sistemas operam na infraestrutura privada da plataforma CØ2.IA.

Este repositório existe apenas para demonstrar a interface e a experiência da plataforma.

---

## Demonstração Online

A versão demonstrativa da plataforma pode ser acessada em:

🔗 **[Demo da Plataforma](https://co2-mineral-intel.base44.app)**

A demo apresenta a interface da CØ2.IA Mineral Intelligence Platform, incluindo:

- dashboard da plataforma
- geração interativa de relatórios
- visualização geoespacial de territórios
- módulos de análise mineral
- camada de inteligência ambiental
- exportação de relatórios em PDF

> ⚠️ **Observação:**
> A demo utiliza dados simulados e estrutura demonstrativa. O motor analítico proprietário da CØ2.IA não está exposto publicamente neste repositório.

---

## Status Atual

> ⚠️ **Protótipo demonstrativo**

**Implementado:**

- dashboard da plataforma
- geração de relatórios
- visualização geoespacial
- camada ambiental
- estrutura modular para múltiplos minerais
- exportação de relatórios em PDF

**Código preservado:**

- O motor analítico proprietário da CØ2.IA foi intencionalmente preservado
- Os algoritmos de prospecção mineral e pipelines de análise satelital não estão incluídos neste repositório

Essa decisão foi tomada para proteger a propriedade intelectual da plataforma, mantendo neste repositório apenas a camada demonstrativa da aplicação e a experiência de uso da interface.

**Não incluído:**

- motor analítico proprietário
- pipeline automatizada de processamento satelital
- modelos de machine learning proprietários
- infraestrutura completa de produção

---

## Possíveis Evoluções Futuras

Versões futuras poderão incluir:

- ingestão automática de dados satelitais
- modelos de machine learning para prospecção mineral
- detecção automática de anomalias geológicas
- inteligência climática e de carbono
- integração com sistemas ESG
- APIs corporativas para empresas de mineração

---

## Licença

MIT License

Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## Sobre a CØ2.IA

CØ2.IA desenvolve sistemas de inteligência baseados em IA para recursos naturais, infraestrutura climática e regeneração ambiental.

A plataforma Mineral Intelligence representa uma interface experimental para suporte geoespacial na tomada de decisão em exploração mineral.
