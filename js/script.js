
const apiKey = "b822bdc9baa1ff2d1b41cd2f";
let baseCurrency = "EUR";
let rate = 0;

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitch();
  generateMoedasMenu();
  fetchAndUpdateRate(baseCurrency);
  attachInputHandlers();
});

function fetchAndUpdateRate(currencyCode) {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyCode}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      rate = data.conversion_rates["BRL"];
      document.getElementById("exchangeRate").textContent = `1 ${currencyCode} = ${rate.toFixed(4)} BRL`;
      convertToBRL();
    })
    .catch(err => console.error("Erro ao obter taxa:", err));
}

function attachInputHandlers() {
  const baseInput = document.getElementById("baseInput");
  const brlInput = document.getElementById("brlInput");

  baseInput.addEventListener("input", () => {
    maskInput(baseInput);
    convertToBRL();
  });

  brlInput.addEventListener("input", () => {
    maskInput(brlInput);
    convertToBase();
  });
}

function maskInput(input) {
  let value = input.value.replace(/[^\d]/g, "");
  value = value.padStart(3, "0");
  const int = value.slice(0, -2);
  const dec = value.slice(-2);
  input.value = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(`${int}.${dec}`));
}

function convertToBRL() {
  const val = parseFloat(document.getElementById("baseInput").value.replace(/\./g, "").replace(",", "."));
  if (!isNaN(val)) {
    const result = val * rate;
    document.getElementById("brlInput").value = formatNumber(result);
  }
}

function convertToBase() {
  const val = parseFloat(document.getElementById("brlInput").value.replace(/\./g, "").replace(",", "."));
  if (!isNaN(val)) {
    const result = val / rate;
    document.getElementById("baseInput").value = formatNumber(result);
  }
}

function formatNumber(num) {
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}

function generateMoedasMenu() {
  const menu = document.getElementById("moedasMenu");
  const continentes = {};

  for (const codigo in moedasInfo) {
    if (codigo === "BRL") continue;
    const info = moedasInfo[codigo];
    if (!continentes[info.continente]) continentes[info.continente] = [];
    continentes[info.continente].push({ codigo, ...info });
  }

  for (const cont in continentes) {
    const header = document.createElement("div");
    header.className = "continent";
    header.textContent = cont;
    menu.appendChild(header);

    continentes[cont].forEach(({ codigo, simbolo, nome, codigoPais }) => {
      const item = document.createElement("div");
      item.className = "moeda-item";
      item.innerHTML = `<img src="https://flagcdn.com/24x18/${codigoPais}.png" class="flag-icon"> ${codigo} - ${nome}`;
      item.onclick = () => switchCurrency(codigo, simbolo, codigoPais);
      menu.appendChild(item);
    });
  }
}

function switchCurrency(codigo, simbolo, codigoPais) {
  baseCurrency = codigo;
  document.getElementById("moedaFlag").src = `https://flagcdn.com/256x192/${codigoPais}.png`;
  document.getElementById("baseSymbol").textContent = simbolo;
  fetchAndUpdateRate(codigo);
  adjustInputPadding();
}

function initThemeSwitch() {
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("change", () => {
    const dark = toggle.checked;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    toggle.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function adjustInputPadding() {
  const inputWrappers = document.querySelectorAll('.input-wrapper');
  inputWrappers.forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const symbol = wrapper.querySelector('.symbol');
    if (input && symbol) {
      const symbolLength = symbol.textContent.trim().length;
      const paddingRight = 35 + (symbolLength - 1) * 10;
      input.style.paddingRight = paddingRight + 'px';
    }
  });
}
window.addEventListener("DOMContentLoaded", adjustInputPadding);
