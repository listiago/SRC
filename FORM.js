let resultadosOriginais;

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('buscar-dados-tabela-especificas');

  ipcRenderer.on('dados-tabela-especificas', (event, dados) => {
    const formularioCamareiras = document.getElementById('formularioCamareiras');

    dados.forEach(camareira => {
      const divCamareira = document.createElement('div');
      divCamareira.classList.add('camareira');

      const labelNome = document.createElement('label');
      labelNome.textContent = ` ${camareira.nome} da ${camareira.ala_atendida}:`;

      const inputSaidas = criarInputNumber(`saidas${camareira.ala_atendida.replace(' ', '')}`, 'Saídas');
      const inputArrumacoes = criarInputNumber(`arrumacoes${camareira.ala_atendida.replace(' ', '')}`, 'Arrumações');

      divCamareira.appendChild(labelNome);
      divCamareira.appendChild(inputSaidas);
      divCamareira.appendChild(inputArrumacoes);

      formularioCamareiras.appendChild(divCamareira);
    });

    const calcularButton = document.createElement('button');
    calcularButton.textContent = 'Inserir ao Plano';
    calcularButton.id = 'calcularButton';

    formularioCamareiras.appendChild(calcularButton);

    formularioCamareiras.addEventListener('submit', (event) => {
      event.preventDefault();
      coletarDadosCamareiras(dados);
      // Chame aqui a função de cálculo ou qualquer lógica que você deseja executar após coletar os dados.
      exibirResultados(); // Adiciona esta função para exibir os resultados na tela
    });
  });

  function criarInputNumber(id, placeholder) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.name = id;
    input.min = '0';
    input.placeholder = placeholder;
    return input;
  }
});


function coletarDadosCamareiras(camareiras) {
  const dadosCamareiras = [];

  totalSaidas = 0; // Zera o total de saídas antes de acumular novamente
  totalArrumacoes = 0; // Zera o total de arrumações antes de acumular novamente

  camareiras.forEach(camareira => {
    const saidas = parseInt(document.getElementById(`saidas${camareira.ala_atendida.replace(' ', '')}`).value);
    const arrumacoes = parseInt(document.getElementById(`arrumacoes${camareira.ala_atendida.replace(' ', '')}`).value);

    totalSaidas += saidas; // Acumula as saídas
    totalArrumacoes += arrumacoes; // Acumula as arrumações

    dadosCamareiras.push({
      camareira: camareira.nome,
      ala: camareira.ala_atendida,
      saidas: saidas,
      arrumacoes: arrumacoes
    });
  });

  document.getElementById('totalSaidas').textContent = `Total de Saídas: ${totalSaidas}`;
  document.getElementById('totalArrumacoes').textContent = `Total de Arrumações: ${totalArrumacoes}`;

  console.log('Dados coletados:', dadosCamareiras); // Adicione esta linha para debugar

  localStorage.setItem('dadosCamareiras', JSON.stringify(dadosCamareiras));
}


function exibirResultados() {
  const resultadosDiv = document.getElementById('resultados');

  if (resultadosDiv) {
    // Aqui, você pode criar e preencher elementos HTML para exibir os resultados
    // Por exemplo, uma tabela
    const tabelaResultados = document.createElement('table');
    tabelaResultados.innerHTML = `
      <caption>Saída e arrumações Informadas</caption>
      <tr>
        <th>Camareira</th>
        <th>Ala</th>
        <th>Saídas</th>
        <th>Arrumações</th>
      </tr>
    `;

    const dadosCamareiras = JSON.parse(localStorage.getItem('dadosCamareiras'));

    resultadosOriginais = JSON.parse(JSON.stringify(dadosCamareiras)); // Armazena os resultados originais

    dadosCamareiras.forEach(camareira => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${camareira.camareira}</td>
        <td>${camareira.ala}</td>
        <td>${camareira.saidas}</td>
        <td>${camareira.arrumacoes}</td>
      `;
      tabelaResultados.appendChild(linha);
    });

    // Limpar o conteúdo anterior antes de adicionar a nova tabela
    resultadosDiv.innerHTML = '';
    resultadosDiv.appendChild(tabelaResultados);

    // Adiciona o botão para distribuir quantidades iguais
    const distribuirButton = document.createElement('button');
    distribuirButton.textContent = 'Distribuir Quantidades Iguais';
    distribuirButton.id = 'distribuirButton';
    distribuirButton.classList.add('na-impressao');

    resultadosDiv.appendChild(distribuirButton);

    // Adiciona o evento de clique para distribuir as quantidades iguais
    distribuirButton.addEventListener('click', () => {
      distribuirQuantidadesIguais();
      exibirResultadosEqualizados();
      exibirDiferencasEqualizadas();// Atualiza os resultados na tela após a distribuição na segunda tabela
      verificarEqualizacaoAntesExibicao(dadosCamareiras);
      
    });
  } else {
    console.error("Elemento 'resultados' não encontrado no DOM.");
  }
}


function distribuirQuantidadesIguais() {
  const dadosCamareiras = JSON.parse(localStorage.getItem('dadosCamareiras'));

  // Calcula a quantidade média de saídas e arrumações por camareira
  const mediaSaidas = Math.floor(totalSaidas / dadosCamareiras.length);
  const mediaArrumacoes = Math.floor(totalArrumacoes / dadosCamareiras.length);

  // Calcula o resto da divisão por 3
  const restoSaidas = totalSaidas % dadosCamareiras.length;
  const restoArrumacoes = totalArrumacoes % dadosCamareiras.length;

  // Ordena as camareiras pelo número de saídas e arrumações em ordem decrescente
  dadosCamareiras.sort((a, b) => b.saidas + b.arrumacoes - (a.saidas + a.arrumacoes));

  // Distribui a média para cada camareira
  dadosCamareiras.forEach((camareira, index) => {
    camareira.saidas = mediaSaidas;
    camareira.arrumacoes = mediaArrumacoes;

    // Distribui o resto para as primeiras camareiras
    if (index < restoSaidas) {
      camareira.saidas += 1;
    }

    if (index < restoArrumacoes) {
      camareira.arrumacoes += 1;
    }
  });

  // Verifica e ajusta a diferença total
  ajustarDiferencaTotal(dadosCamareiras);

  localStorage.setItem('dadosCamareiras', JSON.stringify(dadosCamareiras));
}

function ajustarDiferencaTotal(dadosCamareiras) {
  // Calcula a diferença total de saídas e arrumações
  const diferencaTotal = dadosCamareiras.reduce((diferenca, camareira) => {
    return diferenca + (camareira.saidas + camareira.arrumacoes) - (camareira.saidasAtribuidas + camareira.arrumacoesAtribuidas);
  }, 0);

  // Ajusta a diferença total redistribuindo entre as camareiras
  if (diferencaTotal > 0) {
    // Excesso de saídas e arrumações
    dadosCamareiras.forEach((camareira) => {
      while (camareira.saidas + camareira.arrumacoes > camareira.saidasAtribuidas + camareira.arrumacoesAtribuidas + 1) {
        // Transferir uma unidade para outra camareira com deficiência
        const outraCamareira = dadosCamareiras.find((outra) =>
          outra.saidas + outra.arrumacoes < outra.saidasAtribuidas + outra.arrumacoesAtribuidas
        );

        if (outraCamareira) {
          camareira.saidas -= 1;
          camareira.arrumacoes -= 1;

          outraCamareira.saidas += 1;
          outraCamareira.arrumacoes += 1;
        } else {
          // Não há camareiras com deficiência para transferir, sair do loop
          break;
        }
      }
    });
  } else if (diferencaTotal < 0) {
    // Deficiência de saídas e arrumações
    dadosCamareiras.forEach((camareira) => {
      while (camareira.saidas + camareira.arrumacoes < camareira.saidasAtribuidas + camareira.arrumacoesAtribuidas - 1) {
        // Transferir uma unidade de outra camareira com excesso
        const outraCamareira = dadosCamareiras.find((outra) =>
          outra.saidas + outra.arrumacoes > outra.saidasAtribuidas + outra.arrumacoesAtribuidas
        );

        if (outraCamareira) {
          camareira.saidas += 1;
          camareira.arrumacoes += 1;

          outraCamareira.saidas -= 1;
          outraCamareira.arrumacoes -= 1;
        } else {
          // Não há camareiras com excesso para transferir, sair do loop
          break;
        }
      }
    });
  }
}

//INICIO DO CALCULO DE TOTAL DE SAÍDAS 
let totalSaidas = 0;
let totalArrumacoes = 0;

function coletarDadosCamareiras(camareiras) {
  const dadosCamareiras = [];

  totalSaidas = 0; // Zera o total de saídas antes de acumular novamente
  totalArrumacoes = 0; // Zera o total de arrumações antes de acumular novamente

  camareiras.forEach(camareira => {
    const saidas = parseInt(document.getElementById(`saidas${camareira.ala_atendida.replace(' ', '')}`).value);
    const arrumacoes = parseInt(document.getElementById(`arrumacoes${camareira.ala_atendida.replace(' ', '')}`).value);

    totalSaidas += saidas; // Acumula as saídas
    totalArrumacoes += arrumacoes; // Acumula as arrumações

    dadosCamareiras.push({
      camareira: camareira.nome,
      ala: camareira.ala_atendida,
      saidas: saidas,
      arrumacoes: arrumacoes
    });
  });

  localStorage.setItem('dadosCamareiras', JSON.stringify(dadosCamareiras));
}

// FIM DO CALCULO DE TOTAIS 

// Função para exibir os resultados na segunda tabela
function exibirResultadosEqualizados() {
  const resultadosEqualizadosDiv = document.getElementById('resultadosEqualizados');

  if (resultadosEqualizadosDiv) {
    const tabelaResultadosEqualizados = document.createElement('table');
    tabelaResultadosEqualizados.innerHTML = `
      <caption>Resultados Equalizados</caption>
      <tr>
        <th>Camareira</th>
        <th>Ala</th>
        <th>Saídas</th>
        <th>Arrumações</th>
      </tr>
    `;

    const dadosCamareiras = JSON.parse(localStorage.getItem('dadosCamareiras'));
    verificarEqualizacaoAntesExibicao(dadosCamareiras);


    dadosCamareiras.forEach(camareira => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${camareira.camareira}</td>
        <td>${camareira.ala}</td>
        <td>${camareira.saidas}</td>
        <td>${camareira.arrumacoes}</td>
      `;
      tabelaResultadosEqualizados.appendChild(linha);
    });

    // Limpar o conteúdo anterior antes de adicionar a nova tabela
    resultadosEqualizadosDiv.innerHTML = '';
    resultadosEqualizadosDiv.appendChild(tabelaResultadosEqualizados);
    
  } else {
    console.error("Elemento 'resultadosEqualizados' não encontrado no DOM.");
  }
  
}

function exibirDiferencasEqualizadas() {
  const diferencasEqualizadasDiv = document.getElementById('diferencasEqualizadas');

  if (diferencasEqualizadasDiv) {
    const tabelaDiferencasEqualizadas = document.createElement('table');
    tabelaDiferencasEqualizadas.innerHTML = `
      <caption>Diferenças Equalizadas</caption>
      <tr>
        <th>Camareira</th>
        <th>Diferença de Saídas</th>
        <th>Diferença de Arrumações</th>
      </tr>
    `;

    const dadosCamareiras = JSON.parse(localStorage.getItem('dadosCamareiras'));

    resultadosOriginais.forEach((camareiraOriginal, index) => {
      const camareiraEqualizada = dadosCamareiras[index];

      const diferencaSaidas = camareiraEqualizada.saidas - camareiraOriginal.saidas;
      const diferencaArrumacoes = camareiraEqualizada.arrumacoes - camareiraOriginal.arrumacoes;

      const sinalSaidas = diferencaSaidas !== 0 ? (diferencaSaidas > 0 ? '+' : '-') : '';
      const sinalArrumacoes = diferencaArrumacoes !== 0 ? (diferencaArrumacoes > 0 ? '+' : '-') : '';

      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${camareiraOriginal.camareira}</td>
        <td>${sinalSaidas}${Math.abs(diferencaSaidas)}</td>
        <td>${sinalArrumacoes}${Math.abs(diferencaArrumacoes)}</td>
      `;
      tabelaDiferencasEqualizadas.appendChild(linha);
    });

    // Limpar o conteúdo anterior antes de adicionar a nova tabela
    diferencasEqualizadasDiv.innerHTML = '';
    diferencasEqualizadasDiv.appendChild(tabelaDiferencasEqualizadas);
  } else {
    console.error("Elemento 'diferencasEqualizadas' não encontrado no DOM.");
  }
}

function verificarEqualizacaoAntesExibicao(dadosCamareiras) {
  // Ordena as camareiras pelo número total de saídas e arrumações em ordem decrescente
  dadosCamareiras.sort((a, b) => (b.saidas + b.arrumacoes) - (a.saidas + a.arrumacoes));

  // Verifica se alguma camareira com mais saídas também tem mais arrumações
  const camareiraMaisSaidasArrumacoes = dadosCamareiras.find(camareira =>
    camareira.saidas === Math.max(...dadosCamareiras.map(c => c.saidas)) &&
    camareira.arrumacoes === Math.max(...dadosCamareiras.map(c => c.arrumacoes))
  );

  if (camareiraMaisSaidasArrumacoes) {
    // Encontra uma camareira com menos saídas
    const camareiraMenosSaidas = dadosCamareiras.find(camareira =>
      camareira.saidas === Math.min(...dadosCamareiras.map(c => c.saidas))
    );

    if (camareiraMenosSaidas) {
      // Redistribui uma arrumação da camareira com mais saídas e arrumações para a camareira com menos saídas
      camareiraMaisSaidasArrumacoes.arrumacoes -= 1;
      camareiraMenosSaidas.arrumacoes += 1;

      // Atualiza o total de arrumações
      

      // Atualiza o Local Storage com os novos dados
      localStorage.setItem('dadosCamareiras', JSON.stringify(dadosCamareiras));
    }
  }
}







