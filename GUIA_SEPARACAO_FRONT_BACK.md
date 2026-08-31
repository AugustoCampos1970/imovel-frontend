# 🚀 Guia Completo: Separação em Frontend e Backend (Dois Repositórios)

Este documento contém o passo a passo completo e todos os comandos de terminal necessários para separar o projeto em dois repositórios independentes no GitHub.

---

## 📁 Estrutura e Caminhos das Pastas no seu Computador

| Projeto | Caminho no Windows | Descrição / Tecnologias |
| :--- | :--- | :--- |
| 🎨 **Frontend** | `C:\Users\Sabino\Desktop\programa Augusto\frontend` | Interface do usuário (React, Vite, Tailwind CSS, Telas e Formulários) |
| ⚙️ **Backend** | `C:\Users\Sabino\Desktop\programa Augusto\backend` | Servidor e API (Python, Regras de negócio, Rotas e Banco SQL) |

---

## 🎨 Parte 1: Repositório do Frontend

### 1. Criar o Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Nome do repositório: `imovel-frontend`.
3. Escolha **Público** ou **Privado** (não adicione README nem .gitignore pelo site).
4. Clique em **Create repository**.

### 2. Comandos no Terminal (PowerShell)

```powershell
# 1. Entrar na pasta do Frontend
cd "C:\Users\Sabino\Desktop\programa Augusto\frontend"

# 2. Inicializar o Git com branch principal 'main'
git init -b main

# 3. Vincular ao seu repositório no GitHub (com seu usuário)
git remote add origin https://AugustoCampos1970@github.com/AugustoCampos1970/imovel-frontend.git

# 4. Adicionar todos os arquivos da interface
git add .

# 5. Criar o primeiro commit
git commit -m "feat: setup inicial do frontend"

# 6. Enviar para o GitHub
git push -u origin main
```

---

## ⚙️ Parte 2: Repositório do Backend

### 1. Criar o Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Nome do repositório: `imovel-backend`.
3. Escolha **Público** ou **Privado** (não adicione README nem .gitignore pelo site).
4. Clique em **Create repository**.

### 2. Comandos no Terminal (PowerShell)

```powershell
# 1. Entrar na pasta do Backend
cd "C:\Users\Sabino\Desktop\programa Augusto\backend"

# 2. Inicializar o Git com branch principal 'main'
git init -b main

# 3. Vincular ao seu repositório no GitHub (com seu usuário)
git remote add origin https://AugustoCampos1970@github.com/AugustoCampos1970/imovel-backend.git

# 4. Adicionar todos os arquivos do backend
git add .

# 5. Criar o commit inicial
git commit -m "feat: setup inicial do backend"

# 6. Enviar para o GitHub
git push -u origin main
```

---

## 🔑 Como Resolver Erro de Permissão / 403 no Git (Troca de Contas)

Se o Windows tentar enviar com outra conta (ex: `peixeweb`) e der erro 403, use uma das soluções abaixo:

### Solução A: Forçar usuário na URL do Remote
Substitua a URL para forçar o login na conta certa:
```powershell
# Para o frontend:
git remote set-url origin https://AugustoCampos1970@github.com/AugustoCampos1970/imovel-frontend.git

# Para o backend:
git remote set-url origin https://AugustoCampos1970@github.com/AugustoCampos1970/imovel-backend.git
```

### Solução B: Usar Token de Acesso Pessoal (PAT)
1. No GitHub (logado como `AugustoCampos1970`), vá em:  
   **Settings** ➔ **Developer Settings** ➔ **Personal access tokens** ➔ **Tokens (classic)**.
2. Clique em **Generate new token (classic)**, marque a caixa **`repo`** e copie o token gerado (`ghp_...`).
3. No terminal, use:
```powershell
# Para o backend:
git remote set-url origin https://SEU_TOKEN_AQUI@github.com/AugustoCampos1970/imovel-backend.git
git push -u origin main
```

---

## 💻 Comandos do Dia a Dia no Terminal

Após os projetos estarem configurados, estes são os comandos que você mais usará:

### 1. Para enviar novas alterações (Commits futuros)

#### No Frontend:
```powershell
cd "C:\Users\Sabino\Desktop\programa Augusto\frontend"
git add .
git commit -m "sua mensagem aqui (ex: atualiza layout da pagina de anuncio)"
git push
```

#### No Backend:
```powershell
cd "C:\Users\Sabino\Desktop\programa Augusto\backend"
git add .
git commit -m "sua mensagem aqui (ex: nova rota de autenticacao)"
git push
```

---

### 2. Para rodar as aplicações no computador

#### Rodar o Frontend (React / Vite):
```powershell
cd "C:\Users\Sabino\Desktop\programa Augusto\frontend"
npm run dev
```
*(Geralmente abre em `http://localhost:5173`)*

#### Rodar o Backend (Python):
```powershell
cd "C:\Users\Sabino\Desktop\programa Augusto\backend"
python main.py
```
*(Ou se usar uvicorn: `uvicorn main:app --reload`)*

---

## 🔄 Como o Frontend e o Backend Conversam (API REST)

* O **Frontend** nunca acessa o banco de dados diretamente. Ele faz chamadas HTTP via `fetch()` ou `axios()` para os endpoints do Backend (ex: `http://localhost:8000/api/imoveis`).
* O **Backend** processa a regra, consulta o banco `database.sql` e devolve os dados em formato JSON para o Frontend desenhar na tela.
