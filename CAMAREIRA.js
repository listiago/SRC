const { ipcRenderer } = require('electron');

// Função para associar nome à ala
function associarNomeAla(ala, dados) {
  const camareira = dados.find(camareira => camareira.ala_atendida === ala);
  return camareira ? camareira.nome : null;
}

// Função para renderizar a tabela
function renderizarTabela(dados) {
  const tableBody = document.getElementById('camareirasTableBody');

  if (!tableBody) {
    console.error("Elemento 'camareirasTableBody' não encontrado no DOM.");
    return;
  }

  tableBody.innerHTML = '';

  dados.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.nome}</td>
      <td>${row.funcao}</td>
      <td>${row.ala_atendida}</td>
      <td><button onclick="editarCamareira(${row.id})">Editar</button></td>
    `;
    tableBody.appendChild(tr);

    // Exemplo de uso da função associarNomeAla dentro do loop
    const nomeCamareira = associarNomeAla(row.ala_atendida, dados);
    console.log(`Nome da camareira na ${row.ala_atendida}: ${nomeCamareira}`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  function carregarDados() {
    ipcRenderer.send('buscar-dados-tabela');
  }

  ipcRenderer.on('dados-tabela', (event, dados) => {
    renderizarTabela(dados);
  });

  carregarDados();
});

// Defina a função no escopo global
window.editarCamareira = function(camareiraId) {
  ipcRenderer.send('editar-camareira', camareiraId);
};

// Função para carregar a Página Principal
function carregarPaginaPrincipal() {
  location.reload();
}

// Função para carregar a Tabela
function carregarTabela() {
  // Aqui você pode adicionar lógica específica se necessário
  location.reload();
}

