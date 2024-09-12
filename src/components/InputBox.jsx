import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [], // List of available currencies from useCurrencyInfo
  selectCurrency = "USD", // Default to USD
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId(); // Unique ID for the input field

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      {/* Amount Input */}
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisable} // Disable if required
          value={amount} // Set current amount
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} // Trigger onAmountChange
        />
      </div>

      {/* Currency Selector */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency} // Set selected currency
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Trigger onCurrencyChange
          disabled={currencyDisable} // Disable if required
        >
          {currencyOptions.length > 0 ? (
            currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option>Loading...</option> // Display while loading currencies
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
