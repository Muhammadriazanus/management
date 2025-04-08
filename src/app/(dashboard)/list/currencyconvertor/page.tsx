// pages/index.tsx
"use client"
import { useState } from 'react';
import CurrencyAPI from '@everapi/currencyapi-js';

const currencyApi = new CurrencyAPI('cur_live_azQrtEo9FOPB1yz2GR22CVAOz0XLVXrW7w5V7ozB');

const currency = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState('EUR,CAD');
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await currencyApi.latest({
        base_currency: baseCurrency.trim(),
        currencies: currencies.replaceAll(' ', ''),
      });
      console.log("🚀 ~ handleSubmit ~ response:", response.data)

      const fetchedRates = response.data;
      setRates(fetchedRates);
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-cyan-800 to-slate-800 min-h-screen py-5">
      <form
        id="latest_rates_form"
        className="mx-auto w-full max-w-sm bg-white shadow rounded-md p-5 space-y-3 text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between space-x-5">
          <label htmlFor="base_currency_input">Base currency:</label>
          <input
            type="text"
            id="base_currency_input"
            name="base_currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="border-slate-300 border rounded-md py-2 px-4 text-sm"
          />
        </div>
        <div className="flex items-center justify-between space-x-5">
          <label htmlFor="currencies">Target currencies:</label>
          <input
            type="text"
            id="currencies"
            name="currencies"
            value={currencies}
            onChange={(e) => setCurrencies(e.target.value)}
            className="border-slate-300 border rounded-md py-2 px-4 text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-md py-2 px-4 mx-auto relative block"
        >
          Get Latest Rates
        </button>
      </form>

      <div
        id="latest_rates_display"
        className="mx-auto my-5 w-full max-w-sm bg-white shadow rounded-md px-5 py-3 text-sm empty:hidden divide-y divide-dotted divide-slate-300"
      >
        {rates ? (
          Object.keys(rates).map((currency) => (
            <div key={currency} className="flex items-center justify-between py-2">
              <strong>{currency}:</strong>
              <span>{rates[currency]}</span>
            </div>
          ))
        ) : (
          <p>No rates available</p>
        )}
      </div>
    </div>
  );
};

export default currency;
