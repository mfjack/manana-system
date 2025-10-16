import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format-price";
import { CreditCard, Banknote, QrCode, LucideIcon } from "lucide-react";
import { useState } from "react";

type paymentMethodId = "credit_card" | "cash" | "qr_code";

type PaymentMethod = {
  id: paymentMethodId;
  name: string;
  icon: LucideIcon;
};

const paymentMethods: PaymentMethod[] = [
  { id: "credit_card", name: "Crédito", icon: CreditCard },
  { id: "cash", name: "Dinheiro", icon: Banknote },
  { id: "qr_code", name: "QR Code", icon: QrCode },
];

export function PaymentCheckout({ total }: { total: number }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<paymentMethodId | null>(null);
  const [cashValue, setCashValue] = useState<string>("");

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={setIsOpenModal}
    >
      <DialogTrigger asChild>
        <Button className="text-xs lg:text-base">Fechar conta</Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden">
        <DialogHeader>
          <DialogTitle>Escolha o método de pagamento</DialogTitle>
        </DialogHeader>

        <div className="flex gap-3 text-center w-full justify-between">
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant={selectedPaymentMethod === method.id ? "secondary" : "ghost"}
              className={`w-36 h-28 flex flex-col p-8 items-center justify-center border-2 rounded transition-colors ${
                selectedPaymentMethod === method.id ? "border-gray-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
              aria-pressed={selectedPaymentMethod === method.id}
              type="button"
            >
              <method.icon className="mb-2 w-8 h-8" />
              <h3 className="font-semibold text-base">{method.name}</h3>
            </Button>
          ))}
        </div>

        <p className="font-medium flex items-center justify-between border border-emerald-500 rounded p-4 shadow">
          Total a pagar: <span>{formatCurrency(total)}</span>
        </p>

        {selectedPaymentMethod === "cash" && (
          <div className="flex flex-col w-full">
            <Input
              type="text"
              placeholder="Digite o valor recebido"
              value={cashValue}
              onChange={(e) => {
                const formatted = formatCurrency(e.target.value);
                setCashValue(formatted);
              }}
            />
            {cashValue && (
              <p className="mt-1 text-sm text-red-500 font-bold">
                Troco: {formatCurrency(Number(cashValue.replace(/[^\d,-]/g, "").replace(",", ".")) - total)}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3 w-full justify-end">
          <Button disabled={!selectedPaymentMethod}>Confirmar</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
