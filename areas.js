const atendimentosCamareiras = {
    'Ala 7': {
      andares: {
        'Térreo': ['05', '06'],
        '1º Andar': ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112'],
        '7º Andar': ['701', '702']
      }
    },
    'Ala 9': {
      andares: {
        '2º Andar': ['201', '202', '203', '204', '205'],
        '3º Andar': ['301', '302', '303', '304', '305'],
        '4º Andar': ['401', '402', '403', '404', '405'],
        '9º Andar': ['901', '902']
      }
    },
    'Ala 8': {
      andares: {
        '5º Andar': ['501', '502', '503', '504', '505'],
        '6º Andar': ['601', '602', '603', '604', '605'],
        '8º Andar': ['801', '802'],
        'Térreo': ['01', '02', '03', '04']
      }
    }
  };
  
  const quartosDoHotel = {};
  
  // Inicializando os quartos do hotel
  for (const ala in atendimentosCamareiras) {
    const andaresAtendidos = atendimentosCamareiras[ala].andares;
  
    for (const andar in andaresAtendidos) {
      const quartos = andaresAtendidos[andar];
      for (const quartoNumero of quartos) {
        const quartoId = `${ala}-${andar}-${quartoNumero}`;
        quartosDoHotel[quartoId] = { ala: ala, andar: andar, numero: quartoNumero };
      }
    }
  }
  
  // Exemplo de como obter os nomes das camareiras associadas a uma ala
  function obterCamareirasPorAla(ala) {
    const camareirasPorAla = {};
    for (const camareira in atendimentosCamareiras) {
      if (camareirasPorAla[camareira].ala === ala) {
        camareirasPorAla[ala] = camareira;
      }
    }
    return camareirasPorAla;
  }
  
  // Exemplo de uso
  const nomesCamareirasAla7 = obterCamareirasPorAla('Ala 7');
  console.log('Nomes das camareiras da Ala 7:', Object.values(nomesCamareirasAla7));
  




  //EXEMPLO DO ARQUIVO ANTIGO :
// CRIAR CLASSE CAMAREIRAS 
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