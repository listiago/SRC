
function abrirPaginaResultados() {
  // Crie uma janela de resultados
  const janelaResultados = window.open('', '_blank', 'width=800,height=600');

  // Crie variáveis para armazenar os resultados
  const resultadosOriginaisHTML = document.getElementById('resultados').innerHTML;
  const resultadosEqualizadosHTML = document.getElementById('resultadosEqualizados').innerHTML;
  const diferencasEqualizadasHTML = document.getElementById('diferencasEqualizadas').innerHTML;

  // Obtenha a data atual
  const dataAtual = new Date().toLocaleDateString();

  // Adicione o conteúdo HTML que deseja exibir na nova página
  const conteudoHTML = `
    <html>
      <head>
        <title>Plano das Camareiras</title>
        <style>
          /* Adicione seus estilos CSS aqui */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }

          h1 {
            color: #333;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          /* Esconde elementos com a classe na-impressao que não são botões de impressão */
          .na-impressao:not(.imprimirButton) {
            display: none;
          }
        </style>
      </head>
      <body>
        <h3>Plano das Camareiras</h3>
        <p>Data: ${dataAtual}</p>
        <p>Total de Saídas: ${totalSaidas}</p>
        <p>Total de Arrumações: ${totalArrumacoes}</p>
        <div id="resultadosPagina">${resultadosOriginaisHTML}</div>
        <div id="resultadosEqualizadosPagina">${resultadosEqualizadosHTML}</div>
        <div id="diferencasEqualizadasPagina">${diferencasEqualizadasHTML}</div>
        <button class="na-impressao imprimirButton" onclick="window.print()">Imprimir</button>
      </body>
    </html>
  `;

  // Escreva o conteúdo HTML na nova janela
  janelaResultados.document.write(conteudoHTML);

  // Feche a tag body e html
  janelaResultados.document.write('</body></html>');

  // Feche a janela de resultados
  janelaResultados.document.close();
}
