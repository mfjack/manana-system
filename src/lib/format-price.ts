export const formatCurrency = (value: string | number) => {
  let amount: number;

  if (typeof value === "number") {
    amount = value;
  } else {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");
    // Se estiver vazio, retorna 0
    if (!numbers) return "R$ 0,00";
    // Converte para centavos (divide por 100)
    amount = Number(numbers) / 100;
  }

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
};

export const parseCurrencyToNumber = (formattedValue: string): number => {
  // Remove tudo que não é dígito
  const numbers = formattedValue.replace(/\D/g, "");
  // Se estiver vazio, retorna 0
  if (!numbers) return 0;
  // Converte centavos para reais (divide por 100)
  return Number(numbers) / 100;
};
