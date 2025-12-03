import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Stock {
  symbol: string;
  price: number;
  exchange: string;
  name?: string;
}

interface OrderWindowProps {
  stock: Stock;
  initialOrderType: 'BUY' | 'SELL';
  onClose: () => void;
  modifyMode?: boolean; 
  initialPosition?: { x: number; y: number };
  initialQuantity?: number; // <-- ADD THIS LINE
}

const OrderWindow: React.FC<OrderWindowProps> = ({  
  stock,  
  initialOrderType,  
  onClose,  
  modifyMode = false,
  initialPosition = { x: 100, y: 100 },
  initialQuantity, // <-- ADD THIS LINE
}) => {
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>(initialOrderType);
  // V-- UPDATE THIS LINE --V
  const [quantity, setQuantity] = useState(initialQuantity?.toString() || '1');
  const [price, setPrice] = useState(stock.price.toFixed(2));
  const [triggerPrice, setTriggerPrice] = useState('');
  const [priceType, setPriceType] = useState<'Market' | 'Limit' | 'SL'>('Market');
  const [productType, setProductType] = useState<'CNC' | 'MIS'>('MIS');

  // ... rest of the OrderWindow component code remains the same
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const orderWindowWidth = 384; 
        const orderWindowHeight = windowRef.current?.offsetHeight || 600;
        
        const constrainedX = Math.max(0, Math.min(newX, windowWidth - orderWindowWidth));
        const constrainedY = Math.max(0, Math.min(newY, windowHeight - orderWindowHeight));
        
        setPosition({ x: constrainedX, y: constrainedY });
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSubmit = () => {
    console.log('Order submitted:', {
      symbol: stock.symbol,
      type: orderType,
      quantity: Number(quantity),
      price: priceType === 'Market' ? stock.price : Number(price),
      productType,
      modifyMode
    });
    onClose();
  };
  
  const getButtonText = () => {
    if (modifyMode) return 'Modify Order';
    return orderType;
  };
  
  const getHeaderColor = () => {
    return orderType === 'BUY' ? 'bg-blue-600' : 'bg-red-600';
  };
  
  const getButtonColor = () => {
    if (modifyMode) return 'bg-orange-500 hover:bg-orange-600';
    return orderType === 'BUY' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700';
  };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 z-50 w-96"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
    >
      {/* Header */}
      <div
        className={`${getHeaderColor()} text-white p-4 rounded-t-lg cursor-grab active:cursor-grabbing flex items-center justify-between`}
        onMouseDown={handleMouseDown}
      >
        <div>
          <div className="font-semibold text-lg">{stock.symbol}</div>
          <div className="text-blue-100 text-sm">
            {stock.name && <span>{stock.name} • </span>}
            {stock.exchange} • ₹{stock.price.toFixed(2)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!modifyMode && (
            <div className="relative">
              <div className="w-16 h-8 bg-white bg-opacity-20 rounded-full p-1">
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                    orderType === 'SELL' ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </div>
              <button
                onClick={() => setOrderType(orderType === 'BUY' ? 'SELL' : 'BUY')}
                className="absolute inset-0 w-full h-full opacity-0"
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setProductType('CNC')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              productType === 'CNC'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            CNC (Long-term)
          </button>
          <button
            onClick={() => setProductType('MIS')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              productType === 'MIS'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            MIS (Intraday)
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Qty.</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
              <div className="text-xs text-gray-500 mt-1">1 lot</div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={priceType === 'Market'}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  priceType === 'Market' ? 'bg-gray-100 text-gray-500' : ''
                }`}
                placeholder="0.00"
              />
            </div>
          </div>
          {priceType === 'SL' && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Trigger price</label>
              <input
                type="number"
                value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          )}
          <div className="flex space-x-6">
            {['Market', 'Limit', 'SL'].map((pt) => (
              <label key={pt} className="flex items-center">
                <input
                  type="radio"
                  name="priceType"
                  value={pt}
                  checked={priceType === pt}
                  onChange={(e) => setPriceType(e.target.value as any)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{pt}</span>
              </label>
            ))}
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Required</span>
              <span className="font-medium">₹{(Number(quantity) * Number(price)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Available</span>
              <span className="text-blue-600 font-medium">₹650.60 ↻</span>
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              className={`flex-1 py-3 px-4 rounded-md font-medium text-white transition-colors ${getButtonColor()}`}
            >
              {getButtonText()}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWindow;