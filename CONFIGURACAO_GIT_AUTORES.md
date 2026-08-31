# Configuração de Autores Git por Pessoa/Pasta

Este guia configura o Git para que **cada commit saia automaticamente no nome da pessoa certa** baseado na pasta/arquivo que ela está editando.

---

## Estrutura do Projeto e Responsabilidades

```
programa Augusto/
├── backend/                 → Augusto Campos (Backend / FastAPI)
│   ├── main.py
│   └── database.sql
├── frontend/
│   └── src/
│       ├── main.jsx         → Augusto Campos (1977campos7@gmail.com)
│       ├── index.css        → Augusto Campos (1977campos7@gmail.com)
│       ├── App.jsx          → Janayna Nascimento (janayna.nasc2022@gmail.com)
│       ├── Anunciar.jsx     → F. Silva (fsilvasmbg@gmail.com)
│       └── Auth.jsx         → Mara Rakel (mara.rakel2016@outlook.com)
└── CONFIGURACAO_GIT_AUTORES.md
```

---

## Mapeamento de Autores e Módulos

| Integrante | E-mail | Módulo / Responsabilidade | Arquivos Principais |
|---|---|---|---|
| **Janayna Nascimento** | `janayna.nasc2022@gmail.com` | Vitrine, Catálogo, Grid de Imóveis, Modal de Detalhes e Favoritos | `frontend/src/App.jsx` |
| **F. Silva** | `fsilvasmbg@gmail.com` | Módulo de Anúncio e Cadastro de Imóveis | `frontend/src/Anunciar.jsx` |
| **Mara Rakel** | `mara.rakel2016@outlook.com` | Autenticação, Login, Cadastro e Gestão de Sessão | `frontend/src/Auth.jsx` |
| **Augusto Campos** | `1977campos7@gmail.com` | Design System, Base React/Vite, Navbar, Filtros e Backend | `frontend/src/main.jsx`, `frontend/src/index.css`, `backend/` |

---

## Como Fazer os Commits com Autoria Individual

Se os integrantes enviarem os arquivos via pendrive, os commits são realizados atribuindo a autoria diretamente com o comando `--author`:

```bash
# 1. Commit do Módulo de Autenticação (Mara Rakel)
git add frontend/src/Auth.jsx
git commit --author="Mara Rakel <mara.rakel2016@outlook.com>" -m "feat(auth): implementacao da interface de login e cadastro de usuario"

# 2. Commit do Módulo de Anúncio (F. Silva)
git add frontend/src/Anunciar.jsx
git commit --author="F. Silva <fsilvasmbg@gmail.com>" -m "feat(anuncio): desenvolvimento do formulario de cadastro e publicacao de imoveis"

# 3. Commit da Vitrine e Catálogo (Janayna Nascimento)
git add frontend/src/App.jsx
git commit --author="Janayna Nascimento <janayna.nasc2022@gmail.com>" -m "feat(catalogo): desenvolvimento da vitrine, grid de cards e modal de detalhes"

# 4. Commit da Estrutura Base e Design System (Augusto Campos)
git add frontend/src/main.jsx frontend/src/index.css frontend/vite.config.js frontend/package.json
git commit --author="Augusto Campos <1977campos7@gmail.com>" -m "feat(core): configuracao base do frontend React, Tailwind CSS e integracao"
```

---

### 3. Teste a configuração

Abra **4 terminais separados** (um para cada pessoa/pasta) e rode:

```bash
# Terminal 1 - Pessoa 1 (Backend)
cd "C:/Users/Sabino/Desktop/programa Augusto/backend"
git config user.name
# Saída esperada: Pessoa 1 - Backend

# Terminal 2 - Pessoa 2 (Frontend Core)
cd "C:/Users/Sabino/Desktop/programa Augusto/frontend/src"
git config user.name
# Saída esperada: Pessoa 2 - Frontend Core

# Terminal 3 - Pessoa 3 (Anunciar.jsx)
cd "C:/Users/Sabino/Desktop/programa Augusto/frontend/src"
# Edite o arquivo Anunciar.jsx e faça um commit de teste
git add Anunciar.jsx
git commit -m "teste: commit pessoa 3"
git log -1 --format="%an <%ae>"
# Saída esperada: Pessoa 3 - Anunciar <pessoa3@email.com>

# Terminal 4 - Pessoa 4 (Auth.jsx)
cd "C:/Users/Sabino/Desktop/programa Augusto/frontend/src"
# Edite o arquivo Auth.jsx e faça um commit de teste
git add Auth.jsx
git commit -m "teste: commit pessoa 4"
git log -1 --format="%an <%ae>"
# Saída esperada: Pessoa 4 - Auth <pessoa4@email.com>
```

---

## Como funciona

| Pessoa | Pasta/Arquivo | Arquivo de config |
|--------|---------------|-------------------|
| 1 | `backend/` (qualquer arquivo) | `.gitconfig-pessoa1` |
| 2 | `frontend/src/` (App.jsx, main.jsx, index.css, etc.) | `.gitconfig-pessoa2` |
| 3 | `frontend/src/Anunciar.jsx` | `.gitconfig-pessoa3` |
| 4 | `frontend/src/Auth.jsx` | `.gitconfig-pessoa4` |

**Prioridade**: O Git aplica o `includeIf` mais específico. Como `Anunciar.jsx` e `Auth.jsx` têm regras por **arquivo**, eles sobrescrevem a regra da pasta `frontend/src/`.

---

## Verificação rápida

```bash
# Mostra qual config está ativa no diretório atual
git config --list --show-origin | grep user
```

---

## Solução de problemas

### "Não funcionou, continua no meu nome"
1. Verifique se o caminho no `includeIf` está **exato** (copie do explorer do Windows e troque `\` por `/`)
2. Reinicie o terminal / VS Code após editar `.gitconfig`
3. Confirme versão do Git: `git --version` (precisa 2.38+ para `includeIf` por arquivo)

### "Duas pessoas mexem no mesmo arquivo"
- Combine quem commita por último, ou
- Use branches separadas + PR (cada PR mostra o autor real dos commits)

### "Quero voltar ao normal"
Comente as linhas `[includeIf ...]` no `~/.gitconfig` colocando `#` no início.

---

## Alternativa simples (sem includeIf)

Se não quiser mexer no `.gitconfig` global, cada pessoa roda **uma vez** na pasta dela:

```bash
# Pessoa 1
cd backend && git config user.name "Pessoa 1" && git config user.email "p1@email.com"

# Pessoa 2
cd frontend/src && git config user.name "Pessoa 2" && git config user.email "p2@email.com"

# Pessoa 3
cd frontend/src && git config user.name "Pessoa 3" && git config user.email "p3@email.com"

# Pessoa 4
cd frontend/src && git config user.name "Pessoa 4" && git config user.email "p4@email.com"
```

> **Atenção**: Isso grava no `.git/config` do repositório. Se duas pessoas mexem em `frontend/src/`, a config da última pessoa sobrescreve a anterior. Por isso o método `includeIf` acima é recomendado.

---

## Referências

- [Git Conditional Includes](https://git-scm.com/docs/git-config#_conditional_includes)
- [Git 2.38 Release Notes](https://github.com/git/git/blob/master/Documentation/RelNotes/2.38.0.txt) — suporte a `includeIf` por arquivo