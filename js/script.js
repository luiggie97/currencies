
const apiKey = "b822bdc9baa1ff2d1b41cd2f";
let baseCurrency = "USD";
let rate = 0;

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitch();
  generateMoedasMenu();
  fetchAndUpdateRate(baseCurrency);
  attachInputHandlers();
  adjustInputPadding();
});

function fetchAndUpdateRate(currencyCode) {
  if (cryptoInfo[currencyCode]) {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCoinGeckoId(currencyCode)}&vs_currencies=brl`)
      .then(res => res.json())
      .then(data => {
        rate = data[getCoinGeckoId(currencyCode)].brl;
        document.getElementById("exchangeRate").textContent = `1 ${currencyCode} = ${rate.toFixed(4)} BRL`;
        convertToBRL();
      })
      .catch(err => {
        console.error("Erro ao buscar cotação da cripto:", err);
      });
    return;
  }

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

  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Buscar moeda...";
  searchBox.className = "search-input";
  searchBox.addEventListener("input", (e) => filterMoedas(e.target.value));
  menu.appendChild(searchBox);

  const principalHeader = document.createElement("div");
  principalHeader.className = "continent";
  principalHeader.textContent = "Principais";
  menu.appendChild(principalHeader);
  for (const codigo in principalInfo) {
    const info = principalInfo[codigo];
    const item = document.createElement("div");
    item.className = "moeda-item";
    item.innerHTML = `<img src="${info.imagem}" class="flag-icon"> ${codigo} - ${info.nome}`;
    item.onclick = () => switchToPrincipal(codigo);
    menu.appendChild(item);
  }

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

  const cryptoHeader = document.createElement("div");
  cryptoHeader.className = "continent";
  cryptoHeader.textContent = "Cripto";
  menu.appendChild(cryptoHeader);

  for (const codigo in cryptoInfo) {
    const info = cryptoInfo[codigo];
    const item = document.createElement("div");
    item.className = "moeda-item";
    item.innerHTML = `<img src="${info.imagem}" class="flag-icon"> ${codigo} - ${info.nome}`;
    item.onclick = () => switchToCrypto(codigo);
    menu.appendChild(item);
  }

  }


function switchCurrency(codigo, simbolo, codigoPais) {
  baseCurrency = codigo;
  document.getElementById("moedaFlag").src = `https://flagcdn.com/256x192/${codigoPais}.png`;
  document.getElementById("baseSymbol").textContent = simbolo;
  fetchAndUpdateRate(codigo);
  adjustInputPadding();
  localStorage.setItem("moedaBase", codigo);
  atualizarRota(info.nome);
  document.querySelector(".dropdown").classList.add("dropdown-oculto");
  
}

function switchToCrypto(codigo) {
  const info = cryptoInfo[codigo];
  baseCurrency = codigo;
  document.getElementById("moedaFlag").src = info.imagem;
  document.getElementById("baseSymbol").textContent = info.simbolo;

  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCoinGeckoId(codigo)}&vs_currencies=brl`)
    .then(res => res.json())
    .then(data => {
      console.log(data[getCoinGeckoId(codigo)]);
      const price = data[getCoinGeckoId(codigo)].brl;
     
      rate = price;
      document.getElementById("exchangeRate").textContent = `1 ${codigo} = ${price.toFixed(4)} BRL`;
      convertToBRL();
      adjustInputPadding();
      localStorage.setItem("moedaBase", codigo);
  atualizarRota(info.nome);
      document.querySelector(".dropdown").classList.add("dropdown-oculto");
      
    })
    .catch(err => {
      console.error("Erro ao buscar cotação da cripto:", err);
      
      rate = 1;
      document.getElementById("exchangeRate").textContent = `1 ${codigo} ≈ 1 BRL`;
      convertToBRL();
      adjustInputPadding();
      localStorage.setItem("moedaBase", codigo);
  atualizarRota(info.nome);
      document.querySelector(".dropdown").classList.add("dropdown-oculto");
      
    });
}

function getCoinGeckoId(symbol) {
  const mapping = {
    BTC: "bitcoin",
    ETH: "ethereum",
    XRP: "ripple",
    ADA: "cardano"
  };
  return mapping[symbol] || "";
}

function filterMoedas(query) {
  const items = document.querySelectorAll('.moeda-item');
  const groups = document.querySelectorAll('.continent');
  
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  groups.forEach(group => {
    let sibling = group.nextElementSibling;
    let hasVisible = false;
    while (sibling && sibling.classList.contains('moeda-item')) {
      if (sibling.style.display === "block") {
        hasVisible = true;
      }
      sibling = sibling.nextElementSibling;
    }
    group.style.display = hasVisible ? "block" : "none";
  });
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
      const paddingRight = 35 + (symbolLength - 1) * 13;
      input.style.paddingRight = paddingRight + 'px';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("mouseenter", () => {
    dropdown.classList.remove("dropdown-oculto");
  });
});

  
function switchToPrincipal(codigo) {
  const info = principalInfo[codigo];
  baseCurrency = codigo;
  document.getElementById("moedaFlag").src = info.imagem;
  document.getElementById("baseSymbol").textContent = info.simbolo;
  fetchAndUpdateRate(codigo);
  adjustInputPadding();
  localStorage.setItem("moedaBase", codigo);
  atualizarRota(info.nome);
  document.querySelector(".dropdown").classList.add("dropdown-oculto");
}

function switchToCommodity(codigo) {
  const info = commoditiesInfo[codigo];
  baseCurrency = codigo;
  document.getElementById("moedaFlag").src = info.imagem;
  document.getElementById("baseSymbol").textContent = info.simbolo;
  fetchAndUpdateRate(codigo);
  adjustInputPadding();
  localStorage.setItem("moedaBase", codigo);
  atualizarRota(info.nome);
  document.querySelector(".dropdown").classList.add("dropdown-oculto");
}


function atualizarRota(nome) {
  const slug = nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ /g, '-').replace(/\//g, '-');
  const novaURL = window.location.origin + '/agora-' + slug;
  window.history.pushState({}, '', novaURL);
}

function detectarRota() {
  const path = window.location.pathname;
  if (path.startsWith("/agora-")) {
    const slug = path.replace("/agora-", "").replace(/-/g, " ").toLowerCase();

    let encontrada = false;

    for (const codigo in principalInfo) {
      const info = principalInfo[codigo];
      if (info.nome.toLowerCase().replace(/ /g, '') === slug.replace(/ /g, '')) {
        switchToPrincipal(codigo);
        encontrada = true;
        break;
      }
    }

    if (!encontrada) {
      for (const codigo in moedasInfo) {
        const info = moedasInfo[codigo];
        if (info.nome.toLowerCase().replace(/ /g, '') === slug.replace(/ /g, '')) {
          switchCurrency(codigo, info.simbolo, info.codigoPais);
          encontrada = true;
          break;
        }
      }
    }

    if (!encontrada) {
      for (const codigo in cryptoInfo) {
        const info = cryptoInfo[codigo];
        if (info.nome.toLowerCase().replace(/ /g, '') === slug.replace(/ /g, '')) {
          switchToCrypto(codigo);
          break;
        }
      }
    }
  }
}

// Chamar detectarRota quando o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  detectarRota();
});
