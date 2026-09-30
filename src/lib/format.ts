// always 2 decimals, avoids float noise like 483.96000000000004
const formatPrice = (amount: number) => `$ ${amount.toFixed(2)}`;

export { formatPrice };
