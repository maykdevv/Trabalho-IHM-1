// CONTROLE DAS ETAPAS DE AGENDAMENTO E SELEÇÕES

const etapas = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
    document.getElementById('step5'),
    document.getElementById('step6')
];

const botoesAvancar = document.querySelectorAll('[id^=nextStep]');
const botoesVoltar = document.querySelectorAll('[id^=backStep]');
const indicadores = document.querySelectorAll('.booking-stepper .step div:first-child');

let etapaAtual = 0;



function mostrarEtapa(novaEtapa) {
    etapas[etapaAtual].classList.add('hidden');
    etapas[novaEtapa].classList.remove('hidden');
    etapaAtual = novaEtapa;

    indicadores.forEach((el, index) => {
        if (index === etapaAtual) {
            el.classList.remove('bg-gray-200', 'text-gray-500');
            el.classList.add('bg-pink-500', 'text-white');
        } else {
            el.classList.remove('bg-pink-500', 'text-white');
            el.classList.add('bg-gray-200', 'text-gray-500');
        }
    });
}

botoesAvancar.forEach(btn => btn.addEventListener('click', () => mostrarEtapa(etapaAtual + 1)));
botoesVoltar.forEach(btn => btn.addEventListener('click', () => mostrarEtapa(etapaAtual - 1)));

// Variáveis para armazenar seleção
let servicoSelecionado = '';
let profissionalSelecionado = '';
let horarioSelecionado = '';
let precoSelecionado = '';
let dataSelecionada = '';

// Selecionar serviço (só 1)
document.querySelectorAll('#step1 .cursor-pointer').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('#step1 .cursor-pointer').forEach(p =>
      p.classList.remove('selecionado')
    );
    el.classList.add('selecionado');

    // Pega o nome do serviço
    const titulo = el.querySelector('h4')?.innerText || '';
const preco = el.querySelector('.text-pink-500')?.innerText.trim() || '';
servicoSelecionado = titulo;
precoSelecionado = preco;

  });
});

// Selecionar profissional (só 1)
document.querySelectorAll('#step2 .cursor-pointer').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('#step2 .cursor-pointer').forEach(p =>
      p.classList.remove('selecionado')
    );
    el.classList.add('selecionado');

    // Pega o nome do profissional
    const nome = el.querySelector('h4, h3, .nome-profissional')?.innerText.trim() || 'Não identificado';


    profissionalSelecionado = nome;
  });
});

// Selecionar horário (só 1)
document.querySelectorAll('#step3 .grid button').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('#step3 .grid button').forEach(p =>
      p.classList.remove('bg-pink-500', 'text-white')
    );
    el.classList.add('bg-pink-500', 'text-white');

    horarioSelecionado = el.innerText.trim();

// Captura a data selecionada
const campoData = document.getElementById('campoData');
if (campoData) {
  campoData.addEventListener('change', () => {
    dataSelecionada = campoData.value;
  });
}


  });
});

// Atualizar meses do seletor para julho-dezembro 2025
const seletorMes = document.querySelector('#step3 select');
if (seletorMes) {
    seletorMes.innerHTML = `
    <option>Julho 2025</option>
    <option>Agosto 2025</option>
    <option>Setembro 2025</option>
    <option>Outubro 2025</option>
    <option>Novembro 2025</option>
    <option>Dezembro 2025</option>`;
}

// Atualizar resumo na etapa final
const botaoParaResumo = document.getElementById('nextStep3');
botaoParaResumo?.addEventListener('click', () => {
  const resumo = document.getElementById('resumoAgendamento');
  if (resumo) {
    resumo.querySelector('#resumoServico').innerText = servicoSelecionado || 'Não selecionado';
    resumo.querySelector('#resumoProfissional').innerText = profissionalSelecionado || 'Não selecionado';
    resumo.querySelector('#resumoData').innerText = dataSelecionada || 'Não selecionada';
    resumo.querySelector('#resumoHorario').innerText = horarioSelecionado || 'Não selecionado';
    resumo.querySelector('#resumoPreco').innerText = precoSelecionado || 'R$ 0,00';
  }
});



// Pagamento - simulação carregamento
const botaoPagamento = document.getElementById('confirmarpagamento');
const textoPagamento = document.getElementById('textopagamento');
const carregandoPagamento = document.getElementById('pagarcarregamento');

botaoPagamento?.addEventListener('click', () => {
    textoPagamento?.classList.add('hidden');
    carregandoPagamento?.classList.remove('hidden');

    setTimeout(() => mostrarEtapa(etapaAtual + 1), 2000);
});

// Rolagem suave
function rolarSuavemente(ancoraId) {
    const alvo = document.getElementById(ancoraId);
    if (alvo) {
        window.scrollTo({
            top: alvo.offsetTop - 60,
            behavior: 'smooth'
        });
    }
}

document.getElementById('rolarParaAgendamento')?.addEventListener('click', () => {
    rolarSuavemente('booking');
});

document.getElementById('rolarParaServicos')?.addEventListener('click', () => {
    rolarSuavemente('services');
});

// Filtro de categoria de serviços
const seletorCategoria = document.getElementById('serviceCategory');
seletorCategoria?.addEventListener('change', () => {
    const categoriaSelecionada = seletorCategoria.value;
    document.querySelectorAll('[data-categoria-servico]').forEach(servico => {
        const pertence = servico.dataset.categoriaServico === categoriaSelecionada || categoriaSelecionada === "";
        servico.classList.toggle('hidden', !pertence);
    });
});

// Mostrar/esconder serviços além dos 6 primeiros
const cartasServicos = document.querySelectorAll('#servicos .service-card');
const botaoServicos = document.getElementById('mostrarservicos');
let mostrarTodosServicos = false;

function atualizarServicos() {
    cartasServicos.forEach((carta, indice) => {
        carta.style.display = (indice < 6 || mostrarTodosServicos) ? 'block' : 'none';
    });
    botaoServicos.textContent = mostrarTodosServicos ? 'Mostrar Menos' : 'Ver Todos os Serviços';
}

botaoServicos?.addEventListener('click', () => {
    mostrarTodosServicos = !mostrarTodosServicos;
    atualizarServicos();
});
atualizarServicos();

// Mostrar/esconder profissionais além dos 4 primeiros
const cartasEquipe = document.querySelectorAll('#profissionais .card-hover');
const botaoEquipe = document.getElementById('mostrarprofissa');
let mostrarTodaEquipe = false;

function atualizarEquipe() {
    cartasEquipe.forEach((carta, indice) => {
        carta.style.display = (indice < 4 || mostrarTodaEquipe) ? 'block' : 'none';
    });
    botaoEquipe.textContent = mostrarTodaEquipe ? 'Mostrar Menos' : 'Conheça Toda a Equipe';
}

botaoEquipe?.addEventListener('click', () => {
    mostrarTodaEquipe = !mostrarTodaEquipe;
    atualizarEquipe();
});
atualizarEquipe();

// Selecionar bandeira de pagamento
document.querySelectorAll('.bandeira-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.bandeira-btn').forEach(b => b.classList.remove('selecionada'));
        btn.classList.add('selecionada');
        document.getElementById('bandeiraSelecionada').value = btn.dataset.bandeira;
    });
});

document.getElementById('nextStep4')?.addEventListener('click', () => {
  document.getElementById('pagamentoServico').innerText = servicoSelecionado;
  document.getElementById('pagamentoProfissional').innerText = profissionalSelecionado;
  document.getElementById('pagamentoHorario').innerText = horarioSelecionado;
  document.getElementById('pagamentoPreco').innerText = precoSelecionado;
  document.getElementById('pagamentoTotal').innerText = precoSelecionado;
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('max-h-0');

    if (isOpen) {
      mobileMenu.classList.remove('max-h-0');
      mobileMenu.classList.add('max-h-[600px]'); // altura máxima animada
    } else {
      mobileMenu.classList.remove('max-h-[600px]');
      mobileMenu.classList.add('max-h-0');
    }
  });
}

const botaoListaEspera = document.getElementById('botaoListaEspera');
const mensagemListaEspera = document.getElementById('mensagemListaEspera');

if (botaoListaEspera && mensagemListaEspera) {
  botaoListaEspera.addEventListener('click', () => {
    mensagemListaEspera.classList.remove('hidden');
    botaoListaEspera.disabled = true;
    botaoListaEspera.innerText = 'Aguardando...';
    botaoListaEspera.classList.add('opacity-50', 'cursor-not-allowed');
  });
}
const botaoContato = document.getElementById('botaoContato');

if (botaoContato) {
  botaoContato.addEventListener('click', () => {
    botaoContato.innerText = 'Mensagem Enviada';
    botaoContato.disabled = true;
    botaoContato.classList.add('opacity-60', 'cursor-not-allowed');
  });
}
const botaoNewsletter = document.getElementById('botaoNewsletter');

if (botaoNewsletter) {
  botaoNewsletter.addEventListener('click', () => {
    botaoNewsletter.innerText = 'ASSINADO!';
    botaoNewsletter.disabled = true;
    botaoNewsletter.classList.add('opacity-60', 'cursor-not-allowed');
  });
}


