document.addEventListener('DOMContentLoaded', function() {
    const fields = ['gross-profit', 'discounts'];
    const grossProfitInput = document.getElementById('gross-profit');
    const discountsInput = document.getElementById('discounts');
    const netProfitSpan = document.getElementById('net-profit');
    const investmentsSpan = document.getElementById('investments');
    const cashSpan = document.getElementById('cash');
    const generalSpan = document.getElementById('general');

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', formatBRL);
        input.addEventListener('change', calculateResults);
    });

    function formatBRL(event) {
        let input = event.target;
        let value = input.value.replace(/[^\d]/g, '');  // Remove everything except digits

        if (!value) {
            input.value = '';
            return;
        }

        value = (parseInt(value, 10) / 100).toFixed(2);
        value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        input.value = `R$ ${value}`;

        calculateResults();
    }

    function calculateResults() {
        let grossProfit = parseBRL(grossProfitInput.value);
        let discounts = parseBRL(discountsInput.value);
        let netProfit = grossProfit - discounts;
        let investments = netProfit / 3;
        let cash = netProfit / 6;
        let general = netProfit - investments - cash;

        netProfitSpan.innerText = netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        investmentsSpan.innerText = investments.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        cashSpan.innerText = cash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        generalSpan.innerText = general.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function parseBRL(value) {
        if (!value) return 0;
        return parseFloat(value.replace(/[R$ \.]/g, '').replace(',', '.')) || 0;
    }

    // Function to clear inputs in a section
    window.clearInputs = function(sectionId) {
        const section = document.getElementById(sectionId);
        const inputs = section.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = '';
        }
        calculateResults();
    };
});
