# Regras do Repositório

## Autoria

Todos os commits deste repositório devem ser feitos **exclusivamente** por um destes autores:

| Pessoa | E-mail |
|---|---|
| Augusto Campos | `1977campos7@gmail.com` |
| Janayna Nascimento | `janayna.nasc2022@gmail.com` |
| F. Silva | `fsilvasmbg@gmail.com` |
| Mara Rakel | `mara.rakel2016@outlook.com` |

**A conta `peixeweb` NÃO pode aparecer em nenhum commit novo** deste repositório.

## Como configurar o Git localmente

Cada pessoa deve rodar **uma vez** dentro da pasta do projeto:

```bash
# Augusto
git config user.name  "Augusto Campos"
git config user.email "1977campos7@gmail.com"

# Janayna
git config user.name  "Janayna Nascimento"
git config user.email "janayna.nasc2022@gmail.com"

# F. Silva
git config user.name  "F. Silva"
git config user.email "fsilvasmbg@gmail.com"

# Mara Rakel
git config user.name  "Mara Rakel"
git config user.email "mara.rakel2016@outlook.com"
```

A configuração fica salva em `.git/config` (apenas neste repositório) e não afeta outros projetos.

## Como commitar com autor diferente

Se quem está digitando for uma pessoa, mas o commit precisa sair com o nome de outra (por exemplo, integrou arquivos de um colega via pendrive):

```bash
git add arquivo.jsx
git commit --author="Nome Do Colega <colega@email.com>" -m "feat: descricao do trabalho"
```

## Proteção automática

Existe um hook em `.git/hooks/pre-commit` que bloqueia qualquer commit cujo `user.email` local esteja configurado como peixeweb ou similar. O hook só funciona para a pessoa que está rodando os comandos — commits com `--author=` passando por cima do hook são de responsabilidade de quem os cria.