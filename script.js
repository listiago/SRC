class Camareira {
  constructor(nome, andaresAtendidos) {
    this.nome = nome;
    this.andaresAtendidos = andaresAtendidos;
    this.saidas = 0;       // Inicializa as saídas como 0
    this.arrumacoes = 0;   // Inicializa as arrumações como 0
  }

    adicionarAtendimentos(andares) {
      this.andaresAtendidos.push(...andares);
    }

    getTotalAtendimentos() {
      return this.andaresAtendidos.length;
    }
  }




  // Objeto para armazenar os quartos e andares atendidos por cada camareira
  const atendimentosCamareiras = {
    'Rosemeire': {
      andares: ['Térreo', '1º Andar', '7º Andar'],
      quartos: ['01', '02', '03', '04', '05', '06', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '701', '702'],
    },
    'Eliana': {
      andares: ['2º Andar', '3º Andar', '4º Andar', '9º Andar'],
      quartos: ['201', '202', '203', '204', '205', '301', '302', '303', '304', '305', '401', '402', '403', '404', '405', '901', '902'],
    },
    'Cibely': {
      andares: ['5º Andar', '6º Andar', '8º Andar'],
      quartos: ['501', '502', '503', '504', '505', '601', '602', '603', '604', '605', '801', '802'],
    },
  };



  // Objeto para armazenar os quartos do hotel
  const quartosDoHotel = {};

  // Inicializando os quartos do hotel
  for (let andar = 1; andar <= 9; andar++) {
    for (let numero = 1; numero <= 12; numero++) {
      let quartoNumero = numero < 10 ? `0${numero}` : `${numero}`;
      let andarNumero = `${andar}`;
      let quartoId = andar === 1 ? quartoNumero : `${andarNumero}${quartoNumero}`;
      quartosDoHotel[quartoId] = { andar: andarNumero, numero: quartoNumero };
    }
  }



function atualizarDadosCamareiras() {
  const saidasRosemeire = parseInt(document.getElementById("saidasRosemeire").value);
  const arrumacoesRosemeire = parseInt(document.getElementById("arrumacoesRosemeire").value);

  const saidasEliana = parseInt(document.getElementById("saidasEliana").value);
  const arrumacoesEliana = parseInt(document.getElementById("arrumacoesEliana").value);

  const saidasCibely = parseInt(document.getElementById("saidasCibely").value);
  const arrumacoesCibely = parseInt(document.getElementById("arrumacoesCibely").value);

  // Atualize os dados das camareiras
  atendimentosCamareiras['Rosemeire'].saidas = saidasRosemeire;
  atendimentosCamareiras['Rosemeire'].arrumacoes = arrumacoesRosemeire;

  atendimentosCamareiras['Eliana'].saidas = saidasEliana;
  atendimentosCamareiras['Eliana'].arrumacoes = arrumacoesEliana;

  atendimentosCamareiras['Cibely'].saidas = saidasCibely;
  atendimentosCamareiras['Cibely'].arrumacoes = arrumacoesCibely;


  // Atualize a tabela de valores informados
  const tabelaValoresDigitados = document.getElementById("tabela-valores-digitados");
  tabelaValoresDigitados.innerHTML = `
    <tr>
      <th>Camareira</th>
      <th>Saídas</th>
      <th>Arrumações</th>
    </tr>
    <tr>
      <td>Rosemeire</td>
      <td>${saidasRosemeire}</td>
      <td>${arrumacoesRosemeire}</td>
    </tr>
    <tr>
      <td>Eliana</td>
      <td>${saidasEliana}</td>
      <td>${arrumacoesEliana}</td>
    </tr>
    <tr>
      <td>Cibely</td>
      <td>${saidasCibely}</td>
      <td>${arrumacoesCibely}</td>
    </tr>
  `;

  // Limpe os campos de entrada do formulário
  document.getElementById("saidasRosemeire").value = "";
  document.getElementById("arrumacoesRosemeire").value = "";
  document.getElementById("saidasEliana").value = "";
  document.getElementById("arrumacoesEliana").value = "";
  document.getElementById("saidasCibely").value = "";
  document.getElementById("arrumacoesCibely").value = "";

  // Execute a lógica de cálculo e atualização dos resultados
  calcularDistribuicao();
  
   atualizarTotalSaidasArrumacoes();
}


function atualizarTotalSaidasArrumacoes() {
  let totalSaidas = 0;
  let totalArrumacoes = 0;

  // Itera sobre as camareiras e acumula as saídas e arrumações
  for (let camareiraNome in atendimentosCamareiras) {
    const camareira = atendimentosCamareiras[camareiraNome];
    totalSaidas += camareira.saidas;
    totalArrumacoes += camareira.arrumacoes;
  }

  // Atualiza o texto do elemento <h2>
  const totalSaidasArrumacoesElement = document.getElementById("totalSaidasArrumacoes");
  totalSaidasArrumacoesElement.textContent = `Total de Saídas: ${totalSaidas} | Total de Arrumações: ${totalArrumacoes}`;
}




 


  function coletarDadosCamareiras() {
  let totalSaidas = 0;
  let totalArrumacoes = 0;

  const camareiras = ['Rosemeire', 'Eliana', 'Cibely'];

  for (const camareiraNome of camareiras) {
    const saidas = parseInt(document.getElementById(`saidas${camareiraNome}`).value);
    const arrumacoes = parseInt(document.getElementById(`arrumacoes${camareiraNome}`).value);

    atendimentosCamareiras[camareiraNome].saidas = saidas;
    atendimentosCamareiras[camareiraNome].arrumacoes = arrumacoes;

    totalSaidas += saidas;
    totalArrumacoes += arrumacoes;
  }

  // Atualizar elementos HTML com os totais
  const totalSaidasArrumacoesElement = document.getElementById("totalSaidasArrumacoes");
  totalSaidasArrumacoesElement.textContent = `Total de Saídas: ${totalSaidas} | Total de Arrumações: ${totalArrumacoes}`;
  exibirBotaoImprimir(); // Adicionar o botão de impressão
}

 
  




function calcularDistribuicao() {
    coletarDadosCamareiras();

    let totalSaidas = 0;
    let totalArrumacoes = 0;

    for (const camareiraNome in atendimentosCamareiras) {
      const camareira = atendimentosCamareiras[camareiraNome];

      totalSaidas += camareira.saidas;
      totalArrumacoes += camareira.arrumacoes;
    }

    const quocienteSaidas = Math.floor(totalSaidas / 3);
    const restoSaidas = totalSaidas % 3;

    const quocienteArrumacoes = Math.floor(totalArrumacoes / 3);
    const restoArrumacoes = totalArrumacoes % 3;

    const camareiraComMaisSaidas = Object.keys(atendimentosCamareiras).reduce((a, b) =>
      atendimentosCamareiras[a].saidas > atendimentosCamareiras[b].saidas ? a : b
    );

    const camareiraComMenosSaidas = Object.keys(atendimentosCamareiras).reduce((a, b) =>
      atendimentosCamareiras[a].saidas < atendimentosCamareiras[b].saidas ? a : b
    );

    for (const camareiraNome in atendimentosCamareiras) {
      const camareira = atendimentosCamareiras[camareiraNome];

      camareira.saidas = quocienteSaidas;

      if (restoSaidas !== 0) {
        if (camareiraNome === camareiraComMaisSaidas) {
          camareira.saidas += restoSaidas;
        } else {
          camareira.saidas += 1;
          restoSaidas--;
        }
      }

      camareira.arrumacoes = quocienteArrumacoes;

      if (restoArrumacoes !== 0) {
        if (camareiraNome === camareiraComMenosSaidas) {
          camareira.arrumacoes += restoArrumacoes;
        } else {
          camareira.arrumacoes += 1;
          restoArrumacoes--;
        }
      }
      
      const totalSaidasArrumacoes = camareira.saidas + camareira.arrumacoes;

      if (totalSaidasArrumacoes < totalSaidas - 1) {
        camareira.saidas += 1;
      } else if (totalSaidasArrumacoes > totalSaidas + 1) {
        camareira.saidas -= 1;
      }

      if (totalSaidasArrumacoes < totalArrumacoes - 1) {
        camareira.arrumacoes += 1;
      } else if (totalSaidasArrumacoes > totalArrumacoes + 1) {
        camareira.arrumacoes -= 1;
      }
    }
    
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
      <h2>Resultados Após Distribuição</h2>
      <table>
        <tr>
          <th>Camareira</th>
          <th>Saídas</th>
          <th>Arrumações</th>
        </tr>
        ${Object.keys(atendimentosCamareiras)
          .map(camareiraNome => {
            const camareira = atendimentosCamareiras[camareiraNome];
            return `
              <tr>
                <td>${camareiraNome}</td>
                <td>${camareira.saidas}</td>
                <td>${camareira.arrumacoes}</td>
              </tr>
            `;
          })
          .join("")}
      </table>
    `;
  }




  
  function calcularTotais() {
coletarDadosCamareiras();
const tabelaValoresDigitados = document.getElementById("tabela-valores-digitados");
tabelaValoresDigitados.innerHTML = `
  <tr>
    <th>Camareira</th>
    <th>Saídas</th>
    <th>Arrumações</th>
  </tr>
  ${Object.keys(atendimentosCamareiras)
    .map(camareiraNome => {
      const camareira = atendimentosCamareiras[camareiraNome];
      return `
        <tr>
          <td>${camareiraNome}</td>
          <td>${camareira.saidas}</td>
          <td>${camareira.arrumacoes}</td>
        </tr>
      `;
    })
    .join("")}
`;
let totalSaidas = 0;
let totalArrumacoes = 0;

for (const camareiraNome in atendimentosCamareiras) {
  const camareira = atendimentosCamareiras[camareiraNome];

  totalSaidas += camareira.saidas;
  totalArrumacoes += camareira.arrumacoes;
}

// Calcula valores a serem igualados
const restoSaidas = totalSaidas % 3;
const restoArrumacoes = totalArrumacoes % 3;

const camareirasNomes = Object.keys(atendimentosCamareiras);
const numCamareiras = camareirasNomes.length;

const saídasPorCamareira = Math.floor(totalSaidas / numCamareiras);
const arrumaçõesPorCamareira = Math.floor(totalArrumacoes / numCamareiras);

// Ordena as camareiras pelo número de saídas em ordem decrescente
camareirasNomes.sort((a, b) => atendimentosCamareiras[b].saidas - atendimentosCamareiras[a].saidas);

for (let i = 0; i < numCamareiras; i++) {
  const camareiraNome = camareirasNomes[i];
  const camareira = atendimentosCamareiras[camareiraNome];

  const saídasAtribuidas = i < restoSaidas ? saídasPorCamareira + 1 : saídasPorCamareira;
  const arrumaçõesAtribuidas = i < restoArrumacoes ? arrumaçõesPorCamareira + 1 : arrumaçõesPorCamareira;

  camareira.saidasAtribuidas = saídasAtribuidas;
  camareira.arrumacoesAtribuidas = arrumaçõesAtribuidas;
}

const resultadosDiv = document.getElementById("resultados");
resultadosDiv.innerHTML = `
  <h2>Resultados Totais</h2>
  <p class="resultado-totais">Total de Saídas: ${totalSaidas}</p>
  <p class="resultado-totais">Total de Arrumações: ${totalArrumacoes}</p>
`;

for (const camareiraNome in atendimentosCamareiras) {
  const camareira = atendimentosCamareiras[camareiraNome];
  
}
exibirResultadosTabela(resultadosDiv);
ajustarSaidasIguais();
balancearArrumacoes();
ajustarArrumacoesIguais();
exibirDiferencas();


// Adicionar a data atual
const dataAtualElement = document.getElementById("dataAtual");
const dataAtual = new Date();
const dataFormatada = dataAtual.toLocaleDateString('pt-BR'); // Formato: "dia/mês/ano"
dataAtualElement.textContent = `Data: ${dataFormatada}`;

// Exibir o botão de impressão ao lado do botão "INICIAR PLANO"
const iniciarPlanoButton = document.querySelector("button[onclick='calcularTotais()']");
const imprimirButton = document.createElement("button");
imprimirButton.textContent = "Imprimir";
imprimirButton.onclick = () => window.print();
imprimirButton.style.fontSize = "20px";
imprimirButton.style.fontWeight = "bold";
imprimirButton.style.backgroundColor = "#4CAF50"; // Verde
imprimirButton.style.color = "white";
imprimirButton.style.padding = "15px 30px";
imprimirButton.style.border = "none";
imprimirButton.style.cursor = "pointer";
imprimirButton.style.borderRadius = "8px";
imprimirButton.style.transition = "background-color 0.3s ease-in-out";
imprimirButton.style.marginTop = "20px";
imprimirButton.style.marginLeft = "20px";

iniciarPlanoButton.parentNode.insertBefore(imprimirButton, iniciarPlanoButton.nextSibling);

  const formulario = document.getElementById("formularioCamareiras");
  formulario.style.display = "none";

}







function exibirResultadosTabela(resultadosDiv) {
let resultadosTabela = `
  <h2>Resultados Após Distribuição</h2>
  <table>
    <tr>
      <th>Camareira</th>
      <th>Saídas Atribuídas</th>
      <th>Arrumações Atribuídas</th>
    </tr>
`;

for (const camareiraNome in atendimentosCamareiras) {
  const camareira = atendimentosCamareiras[camareiraNome];
  resultadosTabela += `
    <tr>
      <td>${camareiraNome}</td>
      <td>${camareira.saidasAtribuidas}</td>
      <td>${camareira.arrumacoesAtribuidas}</td>
    </tr>
  `;
}

resultadosTabela += '</table>';
resultadosDiv.innerHTML = resultadosTabela;
}







function balancearArrumacoes() {
  const camareirasNomes = Object.keys(atendimentosCamareiras);

  // Encontrar a camareira com mais arrumações
  const camareiraMaisArrumacoes = camareirasNomes.reduce((a, b) =>
    atendimentosCamareiras[a].arrumacoesAtribuidas > atendimentosCamareiras[b].arrumacoesAtribuidas ? a : b
  );

  for (const camareiraNome in atendimentosCamareiras) {
    if (camareiraNome !== camareiraMaisArrumacoes) {
      const camareira = atendimentosCamareiras[camareiraNome];
      const camareiraMais = atendimentosCamareiras[camareiraMaisArrumacoes];

      if (camareira.arrumacoesAtribuidas < camareiraMais.arrumacoesAtribuidas) {
        camareira.arrumacoesAtribuidas++;
        camareiraMais.arrumacoesAtribuidas--;
      }
    }
  }

  // Exibir resultados atualizados na tabela
  exibirResultadosTabela(document.getElementById("resultados"));
}





function exibirDiferencas() {
const diferencasDiv = document.getElementById("diferencasDiv");

const tabelaDiferencas = `
  <h2>Diferenças de Saídas e Arrumações</h2>
  <table>
    <tr>
      <th>Camareira</th>
      <th>Diferença de Saídas</th>
      <th>Diferença de Arrumações</th>
    </tr>
    ${Object.keys(atendimentosCamareiras)
      .map(camareiraNome => {
        const camareira = atendimentosCamareiras[camareiraNome];
        const diferencaSaidas = camareira.saidasAtribuidas - camareira.saidas;
        const diferencaArrumacoes = camareira.arrumacoesAtribuidas - camareira.arrumacoes;

        const sinalSaidas = diferencaSaidas !== 0 ? (diferencaSaidas > 0 ? '+' : '-') : '';
        const sinalArrumacoes = diferencaArrumacoes !== 0 ? (diferencaArrumacoes > 0 ? '+' : '-') : '';

        return `
          <tr>
            <td>${camareiraNome}</td>
            <td>${sinalSaidas}${Math.abs(diferencaSaidas)}</td>
            <td>${sinalArrumacoes}${Math.abs(diferencaArrumacoes)}</td>
          </tr>
        `;
      })
      .join("")}
  </table>
`;

diferencasDiv.innerHTML = tabelaDiferencas;
}




// Função para ativar a impressão da página ao pressionar "Ctrl + P"
document.addEventListener("keydown", function (event) {
if (event.ctrlKey && event.key === "p") {
  event.preventDefault();
  window.print();
}
});



// Função para exibir botão de impressão
function exibirBotaoImprimir() {
  const imprimirButton = document.createElement("button");
  imprimirButton.textContent = "Imprimir";
  imprimirButton.onclick = () => window.print();
  imprimirButton.style.fontSize = "20px";
  imprimirButton.style.fontWeight = "bold";
  imprimirButton.style.backgroundColor = "#4CAF50"; // Verde
  imprimirButton.style.color = "white";
  imprimirButton.style.padding = "15px 30px";
  imprimirButton.style.border = "none";
  imprimirButton.style.cursor = "pointer";
  imprimirButton.style.borderRadius = "8px";
  imprimirButton.style.transition = "background-color 0.3s ease-in-out";

  // Encontre o elemento pai da tabela onde você deseja inserir o botão
  const tabelaQuantidades = document.getElementById("tabela-valores-digitados");

  // Insira o botão antes da tabela
  tabelaQuantidades.parentNode.insertBefore(imprimirButton, tabelaQuantidades);
}




function ajustarSaidasIguais() {
  const resultadosDiv = document.getElementById("resultados");
  const quantidadesInformadasDiv = document.getElementById("tabela-valores-digitados");

  const camareirasNomes = Object.keys(atendimentosCamareiras);

  // Percorre as camareiras na tabela "Resultados Após Distribuição"
  for (const camareiraNome in atendimentosCamareiras) {
    const camareiraResultados = atendimentosCamareiras[camareiraNome];
    const saidasResultados = camareiraResultados.saidasAtribuidas;

    // Encontra a camareira correspondente na tabela "Quantidades Informadas"
    const camareiraQuantidades = atendimentosCamareiras[camareiraNome];
    const saidasQuantidades = camareiraQuantidades.saidas;

    // Se o número de saídas for igual, não há ajuste necessário
    if (saidasResultados === saidasQuantidades) {
      continue;
    }

    // Encontra outra camareira com saídas iguais às "Quantidades Informadas"
    const outraCamareiraIgual = camareirasNomes.find((nome) =>
      atendimentosCamareiras[nome].saidasAtribuidas === saidasQuantidades && nome !== camareiraNome
    );

    // Se encontrou uma camareira com saídas iguais, faz a troca
    if (outraCamareiraIgual) {
      const camareiraTroca = atendimentosCamareiras[outraCamareiraIgual];
      camareiraResultados.saidasAtribuidas = saidasQuantidades;
      camareiraTroca.saidasAtribuidas = saidasResultados;
    }
  }

  // Atualiza a tabela de resultados
  exibirResultadosTabela(resultadosDiv);
}

function ajustarArrumacoesIguais() {
  const resultadosDiv = document.getElementById("resultados");
  const quantidadesInformadasDiv = document.getElementById("tabela-valores-digitados");

  const camareirasNomes = Object.keys(atendimentosCamareiras);

  // Percorre as camareiras na tabela "Resultados Após Distribuição"
  for (const camareiraNome in atendimentosCamareiras) {
    const camareiraResultados = atendimentosCamareiras[camareiraNome];
    const arrumacoesResultados = camareiraResultados.arrumacoesAtribuidas;

    // Encontra a camareira correspondente na tabela "Quantidades Informadas"
    const camareiraQuantidades = atendimentosCamareiras[camareiraNome];
    const arrumacoesQuantidades = camareiraQuantidades.arrumacoes;

    // Se o número de arrumações for igual, não há ajuste necessário
    if (arrumacoesResultados === arrumacoesQuantidades) {
      continue;
    }

    // Encontra outra camareira com arrumações iguais às "Quantidades Informadas"
    const outraCamareiraIgual = camareirasNomes.find((nome) =>
      atendimentosCamareiras[nome].arrumacoesAtribuidas === arrumacoesQuantidades && nome !== camareiraNome
    );

    // Se encontrou uma camareira com arrumações iguais, faz a troca
    if (outraCamareiraIgual) {
      const camareiraTroca = atendimentosCamareiras[outraCamareiraIgual];
      camareiraResultados.arrumacoesAtribuidas = arrumacoesQuantidades;
      camareiraTroca.arrumacoesAtribuidas = arrumacoesResultados;
    }
  }

  // Atualiza a tabela de resultados
  exibirResultadosTabela(resultadosDiv);
}