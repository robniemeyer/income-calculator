document.addEventListener('DOMContentLoaded', function() {
    const fields = ['gross-profit', 'discounts', 'net-profit', 'investments', 'cash', 'general'];

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', formatBRL);
        input.addEventListener('change', calculateTotals);
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

        calculateTotals();
    }

    function calculateTotals() {
        // Calculate totals if necessary
    }

    // Function to clear inputs in a section
    window.clearInputs = function(sectionId) {
        const section = document.getElementById(sectionId);
        const inputs = section.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = '';
        }
        calculateTotals();
    };
});
