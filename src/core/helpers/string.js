const formatCurrency = (amount, currencySymbol = "đ") => {
    if (isNaN(amount)) {
        return "Invalid amount";
    }

    const [integerPart, decimalPart] = amount.toFixed(2).split(".");

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedCurrency = `${formattedIntegerPart} ${currencySymbol}`;

    return formattedCurrency;
};

export { formatCurrency };
