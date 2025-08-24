

export function currencyConverter({amt}:{amt:number | null |undefined}):string{
    if (typeof amt !== "number" || isNaN(amt)) return "₹0.00";
    const amount = amt.toLocaleString('en-IN',{
        style:'currency',
        currency:'INR'
    })
    return amount;
}
