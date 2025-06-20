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

// Selecionar profissional (só 1)
const profissionais = document.querySelectorAll('#step2 .cursor-pointer');
profissionais.forEach(p => {
    p.addEventListener('click', () => {
        profissionais.forEach(outro => outro.classList.remove('bg-pink-50', 'border-pink-200'));
        p.classList.add('bg-pink-50', 'border-pink-200');
    });
});

// Selecionar horário (só 1)
const horarios = document.querySelectorAll('#step3 .grid button');
horarios.forEach(horario => {
    horario.addEventListener('click', () => {
        horarios.forEach(h => h.classList.remove('bg-pink-500', 'text-white'));
        horario.classList.add('bg-pink-500', 'text-white');
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

// Pagamento - simulação carregamento
const botaoPagamento = document.getElementById('confirmPayment');
const textoPagamento = document.getElementById('paymentText');
const carregandoPagamento = document.getElementById('paymentLoader');

botaoPagamento?.addEventListener('click', () => {
    textoPagamento?.classList.add('hidden');
    carregandoPagamento?.classList.remove('hidden');

    setTimeout(() => mostrarEtapa(etapaAtual + 1), 2000);
});

function rolarSuavemente(ancoraId) {
    const alvo = document.getElementById(ancoraId);
    if (alvo) {
        window.scrollTo({
            top: alvo.offsetTop - 60, // opcional: ajustar offset do topo
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

// Etapas de navegação do agendamento
document.querySelectorAll('[id^=nextStep]').forEach(botao =>
    botao.addEventListener('click', () => {
        const etapaAtual = document.querySelector('.step-content:not(.hidden)');
        const proxima = etapaAtual.nextElementSibling;
        if (proxima) {
            etapaAtual.classList.add('hidden');
            proxima.classList.remove('hidden');
            atualizarIndicadores();
        }
    })
);

document.querySelectorAll('[id^=backStep]').forEach(botao =>
    botao.addEventListener('click', () => {
        const etapaAtual = document.querySelector('.step-content:not(.hidden)');
        const anterior = etapaAtual.previousElementSibling;
        if (anterior) {
            etapaAtual.classList.add('hidden');
            anterior.classList.remove('hidden');
            atualizarIndicadores();
        }
    })
);

// Atualiza visual da barra de progresso de etapas
function atualizarIndicadores() {
    const etapas = Array.from(document.querySelectorAll('.step-content'));
    const indexAtual = etapas.findIndex(etapa => !etapa.classList.contains('hidden'));

    document.querySelectorAll('.booking-stepper .step div:first-child').forEach((etapa, i) => {
        etapa.classList.toggle('bg-pink-500', i === indexAtual);
        etapa.classList.toggle('text-white', i === indexAtual);
        etapa.classList.toggle('bg-gray-200', i !== indexAtual);
        etapa.classList.toggle('text-gray-500', i !== indexAtual);
    });
}

// Seleciona apenas 1 profissional
document.querySelectorAll('#step2 .cursor-pointer').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('#step2 .cursor-pointer').forEach(p =>
            p.classList.remove('bg-pink-50', 'border-pink-200')
        );
        el.classList.add('bg-pink-50', 'border-pink-200');
    });
});

// Seleciona apenas 1 serviço com destaque
document.querySelectorAll('#step1 .cursor-pointer').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('#step1 .cursor-pointer').forEach(p =>
            p.classList.remove('bg-pink-50', 'border-pink-200')
        );
        el.classList.add('bg-pink-50', 'border-pink-200');
    });
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
