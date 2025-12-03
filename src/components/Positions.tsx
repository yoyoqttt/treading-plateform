import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import OrderWindow from './OrderWindow'; // Make sure the path is correct

interface Stock {
  symbol: string;
  price: number;
  exchange: string;
  name?: string;
}

interface OrderWindowState {
  isOpen: boolean;
  stock: Stock | null;
  initialOrderType: 'BUY' | 'SELL';
  initialQuantity?: number; // <-- ADD THIS LINE
}

interface Position {
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  type: 'LONG' | 'SHORT';
}

const positions: Position[] = [
    // ... (your positions data remains the same)
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 25,
    buyPrice: 2445.00,
    currentPrice: 2456.75,
    pnl: 293.75,
    pnlPercent: 0.48,
    type: 'LONG'
  },
  {
    symbol: 'NIFTY50',
    name: 'Nifty 50 Index',
    quantity: 100,
    buyPrice: 19850.00,
    currentPrice: 19820.00,
    pnl: -3000.00,
    pnlPercent: -0.15,
    type: 'LONG'
  },
  {
    symbol: 'BANKNIFTY',
    name: 'Bank Nifty Index',
    quantity: 25,
    buyPrice: 45200.00,
    currentPrice: 45450.00,
    pnl: 6250.00,
    pnlPercent: 0.55,
    type: 'LONG'
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    quantity: 50,
    buyPrice: 1500.00, 
    currentPrice: 1480.00, 
    pnl: 1000.00,
    pnlPercent: 0.67,
    type: 'SHORT'
  }
];

const Positions: React.FC = () => {
  const [orderWindowState, setOrderWindowState] = useState<OrderWindowState>({
    isOpen: false,
    stock: null,
    initialOrderType: 'BUY',
  });

  // V-- UPDATE THIS FUNCTION SIGNATURE --V
  const handleOpenOrderWindow = (position: Position, orderType: 'BUY' | 'SELL', quantity?: number) => {
    setOrderWindowState({
      isOpen: true,
      stock: {
        symbol: position.symbol,
        name: position.name,
        price: position.currentPrice,
        exchange: 'NSE', 
      },
      initialOrderType: orderType,
      initialQuantity: quantity, // <-- ADD THIS LINE
    });
  };

  const handleCloseOrderWindow = () => {
    // Reset the entire state on close
    setOrderWindowState({ isOpen: false, stock: null, initialOrderType: 'BUY', initialQuantity: undefined });
  };

  return (
    <>
      <div className="space-y-6">
        {/* ... (header and table structure remains the same) */}
         <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
          <div className="text-sm text-gray-600">
            Live market data
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Open Positions</h2>
          </div>
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
                    Avg. Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {positions.map((position) => (
                  <tr key={position.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{position.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      <span className={position.type === 'LONG' ? 'text-blue-600' : 'text-red-600'}>
                        {position.type === 'SHORT' ? '-' : ''}{position.quantity.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {position.buyPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {position.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.pnl >= 0 ? '+' : '-'}{Math.abs(position.pnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button 
                        onClick={() => handleOpenOrderWindow(position, position.type === 'LONG' ? 'BUY' : 'SELL')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Add
                      </button>
                      {/* V-- UPDATE THIS ONCLICK HANDLER --V */}
                      <button 
                        onClick={() => handleOpenOrderWindow(position, position.type === 'LONG' ? 'SELL' : 'BUY', position.quantity)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Exit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {positions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No open positions. Start trading to see your positions here.</p>
            </div>
          )}
        </div>
      </div>

      {orderWindowState.isOpen && orderWindowState.stock && (
        <OrderWindow
          stock={orderWindowState.stock}
          initialOrderType={orderWindowState.initialOrderType}
          onClose={handleCloseOrderWindow}
          initialQuantity={orderWindowState.initialQuantity} // <-- PASS THE PROP
        />
      )}
    </>
  );
};

export default Positions;