const os = require('os');
const express = require('express');
const _ = require('lodash');

const app = express();
app.disable('x-powered-by');

// ===== EDITE AQUI (nome, subtítulo, versão e integrantes) =====
const NOME_PROJETO = 'Security Urban Sabor';
const SUBTITULO = 'Esteira CI/CD segura com DevSecOps';
const VERSAO = '1.0';
const INTEGRANTES = ['Integrante 1', 'Integrante 2', 'Integrante 3'];
// ==============================================================

const ETAPAS = [
  { nome: 'Source', desc: 'Código versionado em repositório Git no GitHub' },
  { nome: 'Build', desc: 'Instalação das dependências e build com npm' },
  { nome: 'Teste', desc: 'Testes automatizados com Jest e Supertest' },
  { nome: 'Security Scan', desc: 'npm audit nas dependências e Trivy na imagem' },
  { nome: 'Imagem', desc: 'Build da imagem Docker e publicação no GHCR' },
  { nome: 'Deploy', desc: 'Atualização automática do container no runner' },
];

const SEGURANCA = [
  'Scan de dependências com npm audit',
  'Scan da imagem Docker com Trivy',
  'Security gate: HIGH/CRITICAL bloqueiam o deploy',
  'Imagem base Alpine, sem o npm na imagem final',
  'Container executado como usuário não-root',
  'Cabeçalhos HTTP de segurança ativos',
];

const ENDPOINTS = [
  { rota: '/', desc: 'Página inicial' },
  { rota: '/health', desc: 'Verificação de saúde (JSON)' },
  { rota: '/info', desc: 'Informações do container e da versão (JSON)' },
];

const TECNOLOGIAS = [
  'GitHub Actions', 'Docker', 'Node.js', 'Express',
  'Jest', 'npm audit', 'Trivy', 'GHCR',
];

// Cabeçalhos de segurança em todas as respostas
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'self'; style-src 'unsafe-inline'",
  });
  next();
});

function lista(itens, render) {
  return _.map(itens, render).join('');
}

function pagina() {
  const horario = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const etapas = lista(ETAPAS, (e, i) => `
        <li class="etapa">
          <span class="num">${i + 1}</span>
          <div><strong>${_.escape(e.nome)}</strong><p>${_.escape(e.desc)}</p></div>
        </li>`);

  const seguranca = lista(SEGURANCA, (s) => `
        <li class="item"><span class="check">✓</span>${_.escape(s)}</li>`);

  const endpoints = lista(ENDPOINTS, (e) => `
        <li class="item"><code>${_.escape(e.rota)}</code><span>${_.escape(e.desc)}</span></li>`);

  const tags = lista(TECNOLOGIAS, (t) => `<span class="tag">${_.escape(t)}</span>`);
  const integrantes = lista(INTEGRANTES, (n) => `<span class="tag">${_.escape(n)}</span>`);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${_.escape(NOME_PROJETO)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
           background: #0b1220; color: #e5e7eb; line-height: 1.5; }
    header { padding: 56px 24px 40px; text-align: center;
             background: linear-gradient(135deg, #0f766e, #1d4ed8); }
    .selo { display: inline-block; padding: 4px 14px; border-radius: 999px;
            background: rgba(255,255,255,.18); font-size: .85rem; margin-bottom: 16px; }
    h1 { font-size: clamp(1.8rem, 5vw, 3rem); margin-bottom: 8px; }
    header p { opacity: .9; font-size: 1.1rem; }
    main { max-width: 960px; margin: 0 auto; padding: 32px 20px 56px; }
    h2 { margin: 36px 0 16px; font-size: 1.3rem; color: #5eead4; }
    .sobre { color: #cbd5e1; }
    .cards { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
    .card { background: #111a2e; border: 1px solid #1f2a44; border-radius: 12px; padding: 18px; }
    .card span { display: block; font-size: .8rem; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
    .card strong { font-size: 1.15rem; word-break: break-all; }
    .ok { color: #4ade80; }
    ul, ol { list-style: none; display: grid; gap: 12px; }
    .duas { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    .etapa { display: flex; gap: 14px; align-items: center; background: #111a2e;
             border: 1px solid #1f2a44; border-radius: 12px; padding: 14px 18px; }
    .num { flex: none; width: 36px; height: 36px; border-radius: 50%; background: #1d4ed8;
           display: grid; place-items: center; font-weight: 700; }
    .etapa p { color: #94a3b8; font-size: .92rem; }
    .item { display: flex; gap: 12px; align-items: center; background: #111a2e;
            border: 1px solid #1f2a44; border-radius: 12px; padding: 12px 16px; }
    .item .check { color: #4ade80; font-weight: 700; }
    code { background: #162340; border-radius: 6px; padding: 2px 8px; color: #5eead4; }
    .tags { display: flex; flex-wrap: wrap; gap: 10px; }
    .tag { padding: 6px 14px; border-radius: 999px; background: #162340; border: 1px solid #25375f; font-size: .9rem; }
    footer { text-align: center; padding: 24px; color: #64748b; font-size: .85rem; border-top: 1px solid #1f2a44; }
  </style>
</head>
<body>
  <header>
    <div class="selo">Versão ${_.escape(VERSAO)}</div>
    <h1>${_.escape(NOME_PROJETO)}</h1>
    <p>${_.escape(SUBTITULO)}</p>
  </header>
  <main>
    <h2>Status da aplicação</h2>
    <div class="cards">
      <div class="card"><span>Estado</span><strong class="ok">Online</strong></div>
      <div class="card"><span>Versão</span><strong>${_.escape(VERSAO)}</strong></div>
      <div class="card"><span>Container</span><strong>${_.escape(os.hostname())}</strong></div>
      <div class="card"><span>Node.js</span><strong>${_.escape(process.version)}</strong></div>
      <div class="card"><span>Ativo há</span><strong>${Math.floor(process.uptime())} s</strong></div>
      <div class="card"><span>Horário do servidor</span><strong>${_.escape(horario)}</strong></div>
    </div>

    <h2>Sobre o projeto</h2>
    <p class="sobre">Prova de conceito de uma esteira CI/CD com segurança integrada, criada para a empresa fictícia Security Urban Sabor. A cada alteração no código, a pipeline compila, testa, analisa vulnerabilidades, constrói a imagem e atualiza o container automaticamente.</p>

    <h2>Fluxo da esteira</h2>
    <ol>${etapas}
    </ol>

    <div class="duas">
      <div>
        <h2>Segurança aplicada</h2>
        <ul>${seguranca}
        </ul>
      </div>
      <div>
        <h2>Endpoints</h2>
        <ul>${endpoints}
        </ul>
      </div>
    </div>

    <h2>Tecnologias</h2>
    <div class="tags">${tags}</div>

    <h2>Integrantes</h2>
    <div class="tags">${integrantes}</div>
  </main>
  <footer>${_.escape(NOME_PROJETO)} · Projeto AP II DevSecOps</footer>
</body>
</html>`;
}

app.get('/', (req, res) => {
  res.type('html').send(pagina());
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/info', (req, res) => {
  res.json({
    projeto: NOME_PROJETO,
    versao: VERSAO,
    container: os.hostname(),
    node: process.version,
    uptime_segundos: Math.floor(process.uptime()),
    horario: new Date().toISOString(),
  });
});

module.exports = app;
