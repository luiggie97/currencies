
const apiKey = "b822bdc9baa1ff2d1b41cd2f";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;

const brlInput = document.getElementById("brlInput");
const eurInput = document.getElementById("eurInput");
const exchangeRateText = document.getElementById("exchangeRate");

let rate = 0;
let chart;

async function loadRate() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        rate = data.conversion_rates["BRL"];
        exchangeRateText.textContent = `1 EUR = ${rate.toFixed(4)} BRL`;
        convertToBRL();
        renderChart(generateMockHistoricalRates(rate));
    } catch (error) {
        console.error("Erro ao obter taxa de câmbio:", error);
    }
}

function parseNumber(str) {
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
}

function formatNumber(value) {
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function maskInput(inputElement) {
    let value = inputElement.value;
    value = value.replace(/[^\d]/g, "");
    if (value.length < 3) {
        value = value.padStart(3, '0');
    }
    const intPart = value.slice(0, value.length - 2);
    const decimalPart = value.slice(-2);
    const masked = formatNumber(parseFloat(intPart + "." + decimalPart));
    inputElement.value = masked;
}

function convertToBRL() {
    const eur = parseNumber(eurInput.value);
    if (!isNaN(eur)) {
        const brl = eur * rate;
        brlInput.value = formatNumber(brl);
    } else {
        brlInput.value = "";
    }
}

function convertToEUR() {
    const brl = parseNumber(brlInput.value);
    if (!isNaN(brl)) {
        const eur = brl / rate;
        eurInput.value = formatNumber(eur);
    } else {
        eurInput.value = "";
    }
}

function renderChart(dataPoints) {
    const ctx = document.getElementById("rateChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map((_, i) => `Dia ${i + 1}`),
            datasets: [{
                label: 'Histórico EUR → BRL',
                data: dataPoints,
                borderColor: '#2a84c9',
                backgroundColor: 'rgba(42, 132, 201, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function handleBRLInput() {
    maskInput(brlInput);
    convertToEUR();
}

function handleEURInput() {
    maskInput(eurInput);
    convertToBRL();
}

brlInput.addEventListener("input", handleBRLInput);
eurInput.addEventListener("input", handleEURInput);

loadRate();


function generateMockHistoricalRates(currentRate) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        const variation = (Math.random() * 0.1 - 0.05);
        points.push((currentRate + variation).toFixed(4));
    }
    return points;
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

const toggleSwitch = document.getElementById("themeToggle");

function setThemeSwitchState(theme) {
    const html = document.documentElement;
    if (theme === "dark") {
        html.setAttribute("data-theme", "dark");
        toggleSwitch.checked = true;
        localStorage.setItem("theme", "dark");
    } else {
        html.removeAttribute("data-theme");
        toggleSwitch.checked = false;
        localStorage.removeItem("theme");
    }
}

toggleSwitch?.addEventListener("change", () => {
    if (toggleSwitch.checked) {
        setThemeSwitchState("dark");
    } else {
        setThemeSwitchState("light");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        setThemeSwitchState("dark");
    } else {
        setThemeSwitchState("light");
    }
});
