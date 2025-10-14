export const formatCurrency = (value: string | number): string => {
  // Se for número, formata diretamente
  if (typeof value === "number") {
    // Protege contra valores inválidos
    if (isNaN(value) || !isFinite(value)) {
      return "R$ 0,00";
    }

    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Se for string, processa os dígitos
  const cleanValue = value.trim();

  // Se estiver vazio ou for apenas espaços, retorna 0
  if (!cleanValue) {
    return "R$ 0,00";
  }

  // Remove tudo que não é dígito
  const numbers = cleanValue.replace(/\D/g, "");

  // Se não há números, retorna 0
  if (!numbers || numbers === "0") {
    return "R$ 0,00";
  }

  // Converte para centavos (divide por 100)
  const amount = Number(numbers) / 100;

  // Limita o valor máximo para evitar problemas de precisão
  const limitedAmount = Math.min(amount, 999999999.99);

  return limitedAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseCurrencyToNumber = (formattedValue: string): number => {
  // Trata valores nulos, undefined ou vazios
  if (!formattedValue || typeof formattedValue !== "string") {
    return 0;
  }

  const cleanValue = formattedValue.trim();

  // Se estiver vazio após trim, retorna 0
  if (!cleanValue) {
    return 0;
  }

  // Remove tudo que não é dígito
  const numbers = cleanValue.replace(/\D/g, "");

  // Se não há números ou é apenas zeros, retorna 0
  if (!numbers || numbers === "0" || /^0+$/.test(numbers)) {
    return 0;
  }

  // Converte centavos para reais (divide por 100)
  const amount = Number(numbers) / 100;

  // Protege contra valores inválidos e limita o máximo
  if (isNaN(amount) || !isFinite(amount)) {
    return 0;
  }

  // Limita o valor máximo e arredonda para 2 casas decimais
  return Math.min(Math.round(amount * 100) / 100, 999999999.99);
};

/**
 * Formata um valor numérico para exibição em moeda brasileira
 * Útil quando você já tem o valor como número e só precisa formatá-lo
 */
export const formatPrice = (value: number): string => {
  // Protege contra valores inválidos
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return "R$ 0,00";
  }

  // Garante que o valor seja positivo
  const positiveValue = Math.abs(value);

  return positiveValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
