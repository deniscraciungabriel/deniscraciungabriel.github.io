let selectedValue = 1;

function SelectPrice() {
    const rbs = document.querySelectorAll('input[name="price"]');
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value * 1.22;
            break;
        }
    }
}
console.log(selectedValue)
paypal.Buttons({
    // Set up the transaction
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: selectedValue
                }
            }]
        });
    },

    // Finalize the transaction
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            // Show a success message to the buyer
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }


}).render('#smart-button-container');
