const HOURS_IN_YEAR = 8760;
const STEPSIZE = 10;

const layout = {
    //title: 'Visualization',
    xaxis: { title: 'full load hours', range: [0, HOURS_IN_YEAR] },
    yaxis: { title: 'cost', titlefont: { color: 'red' } },
    yaxis2: { title: 'income', titlefont: { color: 'blue' }, side: 'right', overlaying: 'y' },
    showlegend: false,
    grid: { show: true },
    plot_bgcolor: '#f0f0f0'
};

let data = [{ x: [], y: [], line: { color: 'red', width: 2 } }];
let data2 = [{ x: [], y: [], line: { color: 'blue', width: 2 } }];

Plotly.newPlot('graph', [data, data2], layout);

function updateGraph() {
    updateLabels();
    const xValues = [];
    const yValues = [];
    const yValues2 = [];
    let hours = parseFloat(sliderHours.value);
    let lcoe = determine_lcoe(hours);

    for (let x = 0; x <= HOURS_IN_YEAR; x += STEPSIZE) {
        xValues.push(x);
        yValues.push(npvCost(x));
        yValues2.push(npvIncome(x, lcoe));
    }

    Plotly.update('graph', { x: [xValues, xValues], y: [yValues, yValues2] },
        { yaxis: { range: [0, npvCost(HOURS_IN_YEAR)] } },
        [0, 1]);
}

function updateLabels() {
    let hours = parseFloat(sliderHours.value);
    valueHours.textContent = hours.toFixed();
    const lcoeCents = determine_lcoe(hours) * 100;
    document.getElementById('numbLCOE').value = lcoeCents.toFixed(1);
}

function npvCost(x) {
    let invest = parseFloat(numbInvest.value);
    let fuel = parseFloat(numbFuel.value) / 100;
    let heatrate = parseFloat(numbHeatrate.value);
    return invest + fuel * heatrate * pvifa() * x;
}

function npvIncome(x, p) {
    return x * p * pvifa();
}

function determine_lcoe(x) {
    let invest = parseFloat(numbInvest.value);
    let fuel = parseFloat(numbFuel.value) / 100;
    let heatrate = parseFloat(numbHeatrate.value);
    return invest / pvifa() / x + fuel * heatrate;
}

function pvifa() {
    let r = parseFloat(numbDiscount.value) / 100;
    let n = parseFloat(numbDeprYear.value);
    return annuity_factor(r, n);
}


// Event Listener 
document.getElementById('sliderHours').addEventListener('input', updateGraph);
document.getElementById('numbInvest').addEventListener('input', updateGraph);
document.getElementById('numbFuel').addEventListener('input', updateGraph);
document.getElementById('numbHeatrate').addEventListener('input', updateGraph);
document.getElementById('numbDiscount').addEventListener('input', updateGraph);
document.getElementById('numbDeprYear').addEventListener('input', updateGraph);

updateGraph();
