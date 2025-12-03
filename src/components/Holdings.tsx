import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import OrderWindow from './OrderWindow';

interface Stock {
  symbol: string;
  index?: string;
  price?: number;
  change?: number;
  changePercent?: number;
  name?: string;
  exchange?: string;
}

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  value: number;
}

const holdings: Holding[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 50,
    avgPrice: 2420.0,
    currentPrice: 2456.75,
    pnl: 1837.5,
    pnlPercent: 1.52,
    value: 122837.5,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 30,
    avgPrice: 3250.0,
    currentPrice: 3234.5,
    pnl: -465.0,
    pnlPercent: -0.48,
    value: 97035.0,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 80,
    avgPrice: 1550.0,
    currentPrice: 1567.25,
    pnl: 1380.0,
    pnlPercent: 1.11,
    value: 125380.0,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    quantity: 40,
    avgPrice: 1670.0,
    currentPrice: 1645.8,
    pnl: -968.0,
    pnlPercent: -1.45,
    value: 65832.0,
  },
];

const Holdings: React.FC = () => {
  // ✅ state for OrderWindow
  const [orderWindow, setOrderWindow] = useState<{
    stock: Stock;
    orderType: 'BUY' | 'SELL';
  } | null>(null);

  const handleBuySell = (
    holding: Holding,
    orderType: 'BUY' | 'SELL',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    // Map holding to stock format expected by OrderWindow
    const stock: Stock = {
      symbol: holding.symbol,
      price: holding.currentPrice,
      exchange: 'NSE', // Default to NSE, you can modify this based on your needs
      name: holding.name
    };
    setOrderWindow({ stock, orderType });
  };

  const totalInvestment = holdings.reduce(
    (sum, holding) => sum + holding.avgPrice * holding.quantity,
    0
  );
  const totalCurrentValue = holdings.reduce(
    (sum, holding) => sum + holding.value,
    0
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = (totalPnL / totalInvestment) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Holdings</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{totalInvestment.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Value</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{totalCurrentValue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total P&L</p>
            <p
              className={`text-xl font-bold ${
                totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {totalPnL >= 0 ? '+' : ''}₹{Math.abs(totalPnL).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Returns</p>
            <div className="flex items-center">
              {totalPnL >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <p
                className={`text-xl font-bold ${
                  totalPnL >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {totalPnLPercent >= 0 ? '+' : ''}
                {totalPnLPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{holding.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {holding.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {holding.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {holding.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.pnl >= 0 ? '+' : '-'}{Math.abs(holding.pnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {holding.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleBuySell(holding, 'BUY', e)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                      >
                        BUY
                      </button>
                      <button
                        onClick={(e) => handleBuySell(holding, 'SELL', e)}
                        className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                      >
                        SELL
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Window */}
      {orderWindow && (
        <OrderWindow
          stock={orderWindow.stock}
          initialOrderType={orderWindow.orderType}
          onClose={() => setOrderWindow(null)}
        />
      )}
    </div>
  );
};

export default Holdings;
