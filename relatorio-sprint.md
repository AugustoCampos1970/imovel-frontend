# Relatório do Projeto — ImóvelFácil

Portal imobiliário com frontend em **React + Tailwind CSS** e backend em **FastAPI (Python)**.

**Site publicado:** https://augustocampos1970.github.io/imovel/

---

## 1. Definição das tecnologias front-end

| Tecnologia | Função | Justificativa |
|---|---|---|
| **React 18** | Biblioteca para UI baseada em componentes | Reuso de componentes (Header, cards de imóveis, formulários) e gerenciamento de estado |
| **Vite 5** | Bundler e dev server | Build rápido (Hot Module Replacement), padrão moderno de build para React |
| **Tailwind CSS 3** | Estilização (utility-first) | CSS responsivo rápido, sem arquivos CSS soltos, design consistente |
| **JavaScript (ES6+/JSX)** | Linguagem | Padrão do ecossistema React |
| **Lucide React** | Ícones | Ícones leves e acessíveis (casas, busca, coração, telefone etc.) |
| **Axios** | Requisições HTTP | Consumo da API `/api` do backend FastAPI |
| **gh-pages** | Deploy | Publicação automática do build estático no GitHub Pages |

### Justificativa da escolha

- **React + Vite**: desenvolvimento rápido, componentes reutilizáveis e excelente performance de build.
- **Tailwind CSS**: estilização responsiva e consistente, ideal para landing pages e catálogos.
- **Axios**: comunicação simples com a API FastAPI.
- **GitHub Pages**: hospedagem gratuita e integrada ao repositório.

---

## 2. Criação do repositório remoto (GitHub)

- Repositório público: **https://github.com/AugustoCampos1970/imovel**
- Descrição: "Aluguel e Compra de Imóveis"
- Inicialização e vinculação do repositório local com o remoto:

```bash
git init
git remote add origin https://github.com/AugustoCampos1970/imovel.git
git branch -M main
git push -u origin main
```

O repositório contém duas pastas principais:

- `backend/` — API FastAPI (Python)
- `frontend/` — UI React (Vite + Tailwind)

---

## 3. Criação e versionamento da UI + integração com o repositório remoto

### Estrutura da UI (`frontend/`)

```
frontend/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx      # Ponto de entrada React
    ├── App.jsx       # Componente principal (busca, filtros, cards, footer)
    ├── Anunciar.jsx  # Formulário para anunciar imóvel
    ├── Auth.jsx      # Login/cadastro de usuário
    └── index.css     # Estilos Tailwind
```

### Histórico de versionamento (git)

```bash
84611a4 feat(backend): estrutura inicial - Python API
7644acd feat(frontend): estrutura inicial - React + Vite + Tailwind
bfe936d chore: publicar site estatico na raiz para GitHub Pages
6717a3b ci: workflow de deploy para GitHub Pages
055491c ci: disparar deploy via GitHub Actions
d980779 ci: ajuste no workflow
```

### Integração com o repositório remoto

- Commits realizados localmente e enviados via `git push` para as branches `main`/`master`.
- Deploy configurado para **GitHub Pages** com `gh-pages` e workflow de **GitHub Actions**.
- **Site publicado e online:** https://augustocampos1970.github.io/imovel/

---

## 4. Implementação das tarefas da 1ª sprint (Trello)

| # | Tarefa | Situação |
|---|---|---|
| 1 | Configurar ambiente de desenvolvimento (Vite + React + Tailwind) | ✅ Concluída |
| 2 | Criar layout base: header/navbar, hero, footer e responsividade | ✅ Concluída (`App.jsx`) |
| 3 | Implementar busca e filtros de imóveis (tipo, localização, preço, quartos; tabs Comprar/Alugar/Lançamentos) | ✅ Concluída (`App.jsx`) |
| 4 | Criar formulário "Anunciar imóvel" | ✅ Concluída (`Anunciar.jsx`) |
| 5 | Implementar login/cadastro de usuário (favoritos personalizados) | ✅ Concluída (`Auth.jsx`) |
| 6 | Deploy do frontend no GitHub Pages | ✅ Concluída |

---

## Anexos / Referências

- Site (GitHub Pages): https://augustocampos1970.github.io/imovel/
- Repositório: https://github.com/AugustoCampos1970/imovel
- Backend: `backend/main.py` (FastAPI) e `backend/database.sql` (PostgreSQL/Supabase)
