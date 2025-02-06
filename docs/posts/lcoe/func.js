function annuity_factor(r, n) {
    return (1 - Math.pow((1 + r), -n)) / r;
}