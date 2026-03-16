export type InvoiceItem = {
  name: string;
  unitPrice: number;
  quantity: number;
  taxable: boolean;
};

export function calculateInvoice(items: InvoiceItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const taxableAmount = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = Math.floor(taxableAmount * 0.1);

  return {
    subtotal,
    tax,
    total: subtotal + tax
  };
}
