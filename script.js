document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    displayExpenses();

    form.addEventListener('submit' , e => {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (description.trim() === '' || isNaN(amount)){
            return;
        }

        const expense = {
            description,
            amount
        };

        expenses.push(expense);

        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        displayExpenses();
        
    });
    function displayExpenses(){
        expenseList.innerHTML = '';

        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            listItem.classList.ass('list-group-item');
            listItem.innerHTML = `
            <span>${expense.description}</span>
            <span>$${expense.amount}</span>
            <button class="btn btn-danger btn-sm" data-intex="${index}">Delete</button>
            `;

            listItem.querySelector('button').addEventListener('click', e => {
                const index = e.target.dataset.index;
                expenses.splice(index, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                displayExpenses();
            });
            expenseList.appendChild(listItem);

        });
    }
});