
const moedaOrigem = document.getElementById('moedaOrigem');
const valorOrigem = document.getElementById('valorOrigem');
const valorDestino = document.getElementById('valorDestino');
const simboloOrigem = document.getElementById('simboloOrigem');
const simboloDestino = document.getElementById('simboloDestino');

function getCurrencySymbol(codigo) {
  return moedasInfo[codigo] ? moedasInfo[codigo].simbolo : '';
}

function formatarMoedaComBandeira(state) {
  if (!state.id) return state.text;
  const codigoPais = $(state.element).data('flag');
  const bandeiraUrl = `https://flagcdn.com/24x18/${codigoPais}.png`;
  return $(`<span><img src="${bandeiraUrl}" style="width: 24px; height: 18px; margin-right: 8px;" />${state.text}</span>`);
}

function carregarMoedas() {
  const select = $('#moedaOrigem');
  const continentes = {};

  for (const [codigo, info] of Object.entries(moedasInfo)) {
    if (!continentes[info.continente]) continentes[info.continente] = [];
    continentes[info.continente].push({ codigo, ...info });
  }

  const continentesOrdenados = Object.keys(continentes).sort();
  for (const continente of continentesOrdenados) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = continente;

    const moedasOrdenadas = continentes[continente].sort((a, b) => a.nome.localeCompare(b.nome));
    for (const moeda of moedasOrdenadas) {
      const option = document.createElement('option');
      option.value = moeda.codigo;
      option.textContent = `${moeda.nome} (${moeda.codigo})`;
      option.setAttribute('data-flag', moeda.codigoPais);
      optgroup.appendChild(option);
    }

    document.getElementById('moedaOrigem').appendChild(optgroup);
  }

  $('#moedaOrigem').select2({
    placeholder: 'Selecione a moeda',
    allowClear: false,
    templateResult: formatarMoedaComBandeira,
    templateSelection: formatarMoedaComBandeira
  });

  $('#moedaOrigem').val('USD').trigger('change');
  simboloOrigem.textContent = getCurrencySymbol('USD');
  simboloDestino.textContent = getCurrencySymbol('BRL');

  atualizarConversao();
}

async function atualizarConversao(direcao = 'origem') {
  const origem = moedaOrigem.value;
  const destino = 'BRL';
  const response = await fetch(`https://open.er-api.com/v6/latest/${origem}`);
  const data = await response.json();
  const taxa = data.rates[destino];

  if (direcao === 'origem') {
    valorDestino.value = (valorOrigem.value * taxa).toFixed(2);
  } else {
    valorOrigem.value = (valorDestino.value / taxa).toFixed(2);
  }
}

$('#moedaOrigem').on('change', function () {
  const codigo = $(this).val();
  simboloOrigem.textContent = getCurrencySymbol(codigo);
  atualizarConversao();
});

valorOrigem.addEventListener('input', () => atualizarConversao('origem'));
valorDestino.addEventListener('input', () => atualizarConversao('destino'));

carregarMoedas();
