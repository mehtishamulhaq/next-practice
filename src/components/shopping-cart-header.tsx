const ShoppingCartHeader = ({
  totalItems,
  totalCost,
}: {
  totalItems: number;
  totalCost: number;
}) => {
  return (
    <div className="w-full h-20 shrink-0 px-4 shadow-lg shadow-gray-100 flex justify-between gap-4 bg-white ring-2 ring-slate-200 rounded-lg mb-6 items-center text-xl text-slate-600">
      <span>{`${totalItems} Items`}</span>
      <span className="text-3xl font-bold">{`$ ${totalCost}`}</span>
    </div>
  );
};

export default ShoppingCartHeader;
