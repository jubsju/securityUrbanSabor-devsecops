# security Urban Sabor - Esteira CI/CD Segura (AP II DevSecOps)

Prova de conceito de esteira CI/CD com seguranca integrada (DevSecOps).

**Fluxo:** Codigo -> Build -> Teste -> Security Scan (npm audit + Trivy) -> Build da imagem -> Push (GHCR) -> Deploy -> Container

## Arquitetura
Dev -> GitHub -> GitHub Actions -> Trivy -> GHCR -> Self-hosted runner -> Container Docker

## Aplicacao
API Node.js (Express) com duas rotas:
- `/` pagina inicial
- `/health` retorna `{"status":"ok"}`

## Como rodar localmente
```bash
npm install
npm run build
npm test
npm start
```
Acesse http://localhost:3000

## Como rodar com Docker
```bash
docker build -t techsecure-app .
docker run -p 8080:3000 SecurityUrbanSabor-app
```
Acesse http://localhost:8080

## Como funciona a pipeline
Arquivo `.github/workflows/pipeline.yml`, disparado a cada push na `main`:
1. Build (`npm ci` e `npm run build`)
2. Teste (`npm test`)
3. Security scan de dependencias (`npm audit`)
4. Build da imagem Docker
5. Security scan da imagem (Trivy) com security gate: se houver HIGH/CRITICAL com correcao disponivel, a pipeline falha e nao ha deploy
6. Push da imagem para o GHCR
7. Deploy automatico no runner self-hosted (container na porta 8080)

## Ferramentas de seguranca
- npm audit (SCA de dependencias)
- Trivy (scan da imagem Docker)

## Como reproduzir o achado
A dependencia `lodash 4.17.15` e antiga de proposito. Com ela, o scan falha. Para corrigir, atualize o lodash e faca novo push.

## Integrantes
- (preencher)
