function annuity_factor(r, n) {
    return (1 - Math.pow((1 + r), -n)) / r;
}

function updateAnnuity() {
    let d = parseFloat(numDiscountGeneral.value) / 100;
    let y = parseFloat(numDeprYearsGeneral.value);
    const af = annuity_factor(d, y);
    document.getElementById('numAnnuityFactor').value = af.toFixed(1);
}



// Event Listener 
document.getElementById('numDiscountGeneral').addEventListener('input', updateAnnuity);
document.getElementById('numDeprYearsGeneral').addEventListener('input', updateAnnuity);


updateAnnuity();
