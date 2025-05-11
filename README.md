# API Loja de Portas e Janelas (JSON Version)

## Rotas Principais

### Autenticação
`POST /api/auth/login` - Login (use admin@loja.com / 123456)

### Produtos
`GET /api/products` - Lista todos
`POST /api/products` - Adiciona novo (apenas gerentes)

## Futuras Melhorias
1. Conexão com MongoDB (substituir arquivos JSON)
2. Variáveis de ambiente para segredos
3. Integração com frontend