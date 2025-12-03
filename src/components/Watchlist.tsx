import React, { useState, useRef, useEffect } from 'react';
import { Search, Trash2, Plus, TrendingUp, ArrowDownUp, TrendingDown, MoreHorizontal, Check, Pencil, X, GripVertical } from 'lucide-react';
import OrderWindow from './OrderWindow';

interface Stock {
  symbol: string;
  index: string;
  price: number;
  change: number;
  changePercent: number;
}

interface WatchlistData {
  [key: string]: Stock[];
}

// All available stocks for search (data remains the same)
const allStocks: Stock[] = [
    { symbol: 'NIFTY 50', index: 'INDEX', price: 24741.00, change: 6.70, changePercent: 0.03 },
    { symbol: 'NIFTY BANK', index: 'INDEX', price: 54114.55, change: 39.10, changePercent: 0.07 },
    { symbol: 'SENSEX', index: 'INDEX', price: 80710.76, change: -7.25, changePercent: -0.01 },
    { symbol: 'NIFTY MID SELECT', index: 'INDEX', price: 12778.15, change: 39.35, changePercent: 0.31 },
    { symbol: 'NIFTY FIN SERVICE', index: 'INDEX', price: 25889.30, change: 35.90, changePercent: 0.14 },
    { symbol: 'RELIANCE', index: 'NSE', price: 2456.75, change: 23.45, changePercent: 0.96 },
    { symbol: 'TCS', index: 'NSE', price: 3234.50, change: -12.30, changePercent: -0.38 },
    { symbol: 'INFY', index: 'NSE', price: 1567.25, change: 18.75, changePercent: 1.21 },
    { symbol: 'HDFCBANK', index: 'NSE', price: 1645.80, change: -5.60, changePercent: -0.34 },
    { symbol: 'ICICIBANK', index: 'NSE', price: 987.45, change: 8.90, changePercent: 0.91 },
    { symbol: 'BHARTIARTL', index: 'NSE', price: 876.30, change: -3.25, changePercent: -0.37 },
    { symbol: 'ITC', index: 'NSE', price: 432.15, change: 2.85, changePercent: 0.66 },
    { symbol: 'KOTAKBANK', index: 'NSE', price: 1789.60, change: 15.40, changePercent: 0.87 },
    { symbol: 'WIPRO', index: 'NSE', price: 445.20, change: -2.10, changePercent: -0.47 },
    { symbol: 'MARUTI', index: 'NSE', price: 10234.50, change: 125.30, changePercent: 1.24 },
    { symbol: 'TITAN', index: 'NSE', price: 3456.80, change: -45.20, changePercent: -1.29 },
    { symbol: 'ASIANPAINT', index: 'NSE', price: 2987.45, change: 67.80, changePercent: 2.32 },
    { symbol: 'NESTLEIND', index: 'NSE', price: 2234.60, change: -12.40, changePercent: -0.55 },
    { symbol: 'SBIN', index: 'NSE', price: 567.80, change: 12.45, changePercent: 2.24 },
    { symbol: 'LT', index: 'NSE', price: 2345.60, change: -23.40, changePercent: -0.99 },
    { symbol: 'AXISBANK', index: 'NSE', price: 1098.75, change: 8.90, changePercent: 0.82 },
    { symbol: 'BAJFINANCE', index: 'NSE', price: 6789.45, change: 145.30, changePercent: 2.19 },
    { symbol: 'HINDUNILVR', index: 'NSE', price: 2567.80, change: -34.20, changePercent: -1.31 },
    { symbol: 'TECHM', index: 'NSE', price: 1234.50, change: 23.45, changePercent: 1.94 },
    { symbol: 'BPCL', index: 'NSE', price: 392.80, change: 3.10, changePercent: 0.79 },
    { symbol: 'NTPC', index: 'NSE', price: 321.45, change: -1.75, changePercent: -0.54 },
    { symbol: 'EICHERMOT', index: 'NSE', price: 3850.20, change: 22.50, changePercent: 0.59 },
    { symbol: 'HEROMOTOCO', index: 'NSE', price: 4625.60, change: -18.40, changePercent: -0.40 },
    { symbol: 'HINDALCO', index: 'NSE', price: 621.75, change: 4.25, changePercent: 0.69 },
    { symbol: 'DRREDDY', index: 'NSE', price: 6025.30, change: -25.15, changePercent: -0.42 },
    { symbol: 'DIVISLAB', index: 'NSE', price: 3620.10, change: 12.90, changePercent: 0.36 },
    { symbol: 'CIPLA', index: 'NSE', price: 1245.50, change: -6.25, changePercent: -0.50 },
    { symbol: 'M&M', index: 'NSE', price: 1685.40, change: 9.60, changePercent: 0.57 },
    { symbol: 'SBICARD', index: 'NSE', price: 815.25, change: -2.40, changePercent: -0.29 },
    { symbol: 'BAJAJ-AUTO', index: 'NSE', price: 5520.75, change: -22.40, changePercent: -0.40 },
    { symbol: 'ADANIPORTS', index: 'NSE', price: 1245.60, change: 7.15, changePercent: 0.58 },
    { symbol: 'HCLTECH', index: 'NSE', price: 1782.30, change: -12.75, changePercent: -0.71 },
    { symbol: 'JSWSTEEL', index: 'NSE', price: 894.20, change: 4.60, changePercent: 0.52 },
    { symbol: 'COALINDIA', index: 'NSE', price: 378.15, change: 2.45, changePercent: 0.65 },
    { symbol: 'GRASIM', index: 'NSE', price: 2160.85, change: 9.30, changePercent: 0.43 },
    { symbol: 'BRITANNIA', index: 'NSE', price: 5465.25, change: 15.90, changePercent: 0.29 },
    { symbol: 'ONGC', index: 'NSE', price: 204.40, change: -1.15, changePercent: -0.56 },
    { symbol: 'ULTRACEMCO', index: 'NSE', price: 9830.75, change: 25.60, changePercent: 0.26 },
    { symbol: 'SUNPHARMA', index: 'NSE', price: 1185.40, change: -6.25, changePercent: -0.52 },
    { symbol: 'POWERGRID', index: 'NSE', price: 264.10, change: 1.20, changePercent: 0.46 },
    { symbol: 'ADANIGREEN', index: 'NSE', price: 956.50, change: 15.35, changePercent: 1.63 },
];

// Initial watchlist data (data remains the same)
const initialWatchlistData: WatchlistData = {
    'Default': [
        { symbol: 'NIFTY 50', index: 'INDEX', price: 24741.00, change: 6.70, changePercent: 0.03 },
        { symbol: 'NIFTY BANK', index: 'INDEX', price: 54114.55, change: 39.10, changePercent: 0.07 },
        { symbol: 'SENSEX', index: 'INDEX', price: 80710.76, change: -7.25, changePercent: -0.01 },
        { symbol: 'NIFTY MID SELECT', index: 'INDEX', price: 12778.15, change: 39.35, changePercent: 0.31 },
        { symbol: 'NIFTY FIN SERVICE', index: 'INDEX', price: 25889.30, change: 35.90, changePercent: 0.14 },
    ],
    'Watchlist 2': [
        { symbol: 'RELIANCE', index: 'NSE', price: 2456.75, change: 23.45, changePercent: 0.96 },
        { symbol: 'TCS', index: 'NSE', price: 3234.50, change: -12.30, changePercent: -0.38 },
        { symbol: 'INFY', index: 'NSE', price: 1567.25, change: 18.75, changePercent: 1.21 },
    ],
    'Watchlist 3': [
        { symbol: 'HDFCBANK', index: 'NSE', price: 1645.80, change: -5.60, changePercent: -0.34 },
        { symbol: 'ICICIBANK', index: 'NSE', price: 987.45, change: 8.90, changePercent: 0.91 },
    ],
    'Watchlist 4': [
        { symbol: 'BHARTIARTL', index: 'NSE', price: 876.30, change: -3.25, changePercent: -0.37 },
        { symbol: 'ITC', index: 'NSE', price: 432.15, change: 2.85, changePercent: 0.66 },
    ],
    'Watchlist 5': [
        { symbol: 'KOTAKBANK', index: 'NSE', price: 1789.60, change: 15.40, changePercent: 0.87 },
        { symbol: 'WIPRO', index: 'NSE', price: 445.20, change: -2.10, changePercent: -0.47 },
    ],
    'Watchlist 6': [
        { symbol: 'MARUTI', index: 'NSE', price: 10234.50, change: 125.30, changePercent: 1.24 },
        { symbol: 'TITAN', index: 'NSE', price: 3456.80, change: -45.20, changePercent: -1.29 },
    ],
    'Watchlist 7': [
        { symbol: 'ASIANPAINT', index: 'NSE', price: 2987.45, change: 67.80, changePercent: 2.32 },
        { symbol: 'NESTLEIND', index: 'NSE', price: 2234.60, change: -12.40, changePercent: -0.55 },
    ]
};

const generateMarketDepthData = (basePrice: number) => {
    const bids = Array.from({ length: 5 }, (_, i) => ({
        orders: Math.floor(Math.random() * 10) + 1,
        qty: Math.floor(Math.random() * 500) + 50,
        price: basePrice - (i + 1) * 0.05 - Math.random() * 0.05,
    }));
    const offers = Array.from({ length: 5 }, (_, i) => ({
        orders: Math.floor(Math.random() * 10) + 1,
        qty: Math.floor(Math.random() * 500) + 50,
        price: basePrice + (i + 1) * 0.05 + Math.random() * 0.05,
    }));
    return { bids, offers };
};

const MarketDepthView: React.FC<{ stock: Stock }> = ({ stock }) => {
    const marketData = generateMarketDepthData(stock.price);
    const open = stock.symbol === 'NIFTY 50' ? 24734.30 : stock.price - stock.change;
    const high = stock.symbol === 'NIFTY 50' ? 24751.05 : Math.max(open, stock.price) + Math.abs(stock.change * 1.5);
    const low = stock.symbol === 'NIFTY 50' ? 24724.25 : Math.min(open, stock.price) - Math.abs(stock.change * 1.5);
    const prevClose = stock.symbol === 'NIFTY 50' ? 24734.30 : open;

    return (
        <div className="bg-gray-100 text-xs">
            <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Open</span> <span className="font-medium">{open.toFixed(2)}</span></div>
                <div className="flex justify-between text-green-600"><span className="text-gray-500">High</span> <span className="font-medium">{high.toFixed(2)}</span></div>
                <div className="flex justify-between text-red-600"><span className="text-gray-500">Low</span> <span className="font-medium">{low.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Prev. Close</span> <span className="font-medium">{prevClose.toFixed(2)}</span></div>
                {stock.index !== 'INDEX' && (
                    <div className="col-span-2 flex justify-between mt-2 text-sm">
                        <span className="text-gray-500">Volume</span>
                        <span className="font-medium">{(Math.random() * 5000000 + 100000).toLocaleString()}</span>
                    </div>
                )}
            </div>

            {stock.index !== 'INDEX' && (
                <div className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-blue-600 text-sm">Bids</span>
                                <span className="text-xs text-gray-400">{marketData.bids.reduce((acc, b) => acc + b.qty, 0).toLocaleString()} Qty</span>
                            </div>
                            <div className="text-xs text-gray-500 grid grid-cols-3 gap-2 text-center mb-1">
                                <span>Orders</span><span>Qty</span><span>Price</span>
                            </div>
                            {marketData.bids.map((bid, i) => (
                                <div key={i} className="grid grid-cols-3 gap-2 text-center text-xs p-1 rounded hover:bg-blue-50">
                                    <span className="text-gray-700">{bid.orders}</span>
                                    <span className="text-gray-700">{bid.qty.toLocaleString()}</span>
                                    <span className="font-semibold text-blue-600">{bid.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-red-600 text-sm">Offers</span>
                                <span className="text-xs text-gray-400">{marketData.offers.reduce((acc, o) => acc + o.qty, 0).toLocaleString()} Qty</span>
                            </div>
                            <div className="text-xs text-gray-500 grid grid-cols-3 gap-2 text-center mb-1">
                                <span>Price</span><span>Qty</span><span>Orders</span>
                            </div>
                            {marketData.offers.map((offer, i) => (
                                <div key={i} className="grid grid-cols-3 gap-2 text-center text-xs p-1 rounded hover:bg-red-50">
                                    <span className="font-semibold text-red-600">{offer.price.toFixed(2)}</span>
                                    <span className="text-gray-700">{offer.qty.toLocaleString()}</span>
                                    <span className="text-gray-700">{offer.orders}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const Watchlist: React.FC = () => {
    const [activeWatchlist, setActiveWatchlist] = useState('Default');
    const [searchQuery, setSearchQuery] = useState('');
    const [watchlistData, setWatchlistData] = useState<WatchlistData>(initialWatchlistData);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [orderWindow, setOrderWindow] = useState<{ stock: Stock; orderType: 'BUY' | 'SELL'; } | null>(null);
    const [watchlistOrder, setWatchlistOrder] = useState<string[]>(Object.keys(initialWatchlistData));
    const [sourceIndex, setSourceIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [isDropping, setIsDropping] = useState(false);
    const [expandedStockSymbol, setExpandedStockSymbol] = useState<string | null>(null);

    const renameRef = useRef<HTMLDivElement>(null);
    const sortDropdownRef = useRef<HTMLDivElement>(null);
    const sortButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (renameRef.current && !renameRef.current.contains(event.target as Node)) cancelRenaming();
        };
        if (isRenaming) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isRenaming]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node) && sortButtonRef.current && !sortButtonRef.current.contains(event.target as Node)) {
                setShowSortDropdown(false);
            }
        };
        if (showSortDropdown) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSortDropdown]);
    
    useEffect(() => {
        if (sourceIndex === null) setIsDropping(false);
    }, [sourceIndex]);

    const currentStocks = watchlistData[activeWatchlist] || [];
    const isSearchMode = searchQuery.trim().length > 0;
    const isDragging = sourceIndex !== null;

    const filteredStocks = isSearchMode
        ? allStocks.filter(stock => stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
        : currentStocks;

    const sortWatchlist = (type: 'AZ' | 'LTP' | 'CHANGE', direction: 'ASC' | 'DESC') => {
        setWatchlistData(prev => {
            const currentList = [...(prev[activeWatchlist] || [])];
            const multiplier = direction === 'ASC' ? 1 : -1;

            if (type === 'AZ') currentList.sort((a, b) => a.symbol.localeCompare(b.symbol) * multiplier);
            if (type === 'LTP') currentList.sort((a, b) => (a.price - b.price) * multiplier);
            if (type === 'CHANGE') currentList.sort((a, b) => (a.changePercent - b.changePercent) * multiplier);

            return { ...prev, [activeWatchlist]: currentList };
        });
    };

    const isStockInWatchlist = (symbol: string) => currentStocks.some(stock => stock.symbol === symbol);

    const removeStock = (symbol: string) => {
        setWatchlistData(prev => ({
            ...prev,
            [activeWatchlist]: (prev[activeWatchlist] || []).filter(s => s.symbol !== symbol)
        }));
    };

    const toggleStockInWatchlist = (stock: Stock) => {
        setWatchlistData(prev => {
            const currentList = prev[activeWatchlist] || [];
            const isInList = currentList.some(s => s.symbol === stock.symbol);
            return {
                ...prev,
                [activeWatchlist]: isInList ? currentList.filter(s => s.symbol !== stock.symbol) : [...currentList, stock]
            };
        });
    };

    const handleRenameWatchlist = () => {
        if (newWatchlistName.trim() && newWatchlistName.trim() !== activeWatchlist) {
            const trimmedName = newWatchlistName.trim();
            if (watchlistData[trimmedName]) {
                alert('A watchlist with this name already exists.');
                return;
            }
            setWatchlistOrder(prevOrder => {
                const newOrder = [...prevOrder];
                const index = newOrder.indexOf(activeWatchlist);
                if (index !== -1) newOrder[index] = trimmedName;
                return newOrder;
            });
            setWatchlistData(prevData => {
                const newData = { ...prevData };
                newData[trimmedName] = newData[activeWatchlist];
                delete newData[activeWatchlist];
                return newData;
            });
            setActiveWatchlist(trimmedName);
        }
        setIsRenaming(false);
        setNewWatchlistName('');
    };

    const startRenaming = () => {
        setNewWatchlistName(activeWatchlist);
        setIsRenaming(true);
    };

    const cancelRenaming = () => {
        setIsRenaming(false);
        setNewWatchlistName('');
    };

    const handleBuySell = (stock: Stock, orderType: 'BUY' | 'SELL', e: React.MouseEvent) => {
        e.stopPropagation();
        setOrderWindow({ stock, orderType });
    };
    
    const handleToggleMarketDepth = (symbol: string) => {
        setExpandedStockSymbol(prevSymbol => (prevSymbol === symbol ? null : symbol));
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => setSourceIndex(index), 0);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (index !== sourceIndex) setDragOverIndex(index);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (sourceIndex === null || dragOverIndex === null) return;
        
        setIsDropping(true);

        setWatchlistData(prev => {
            const currentList = [...(prev[activeWatchlist] || [])];
            const [removed] = currentList.splice(sourceIndex, 1);
            currentList.splice(dragOverIndex, 0, removed);
            return { ...prev, [activeWatchlist]: currentList };
        });
        
        setSourceIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setSourceIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="h-full flex flex-col bg-white relative">
            <div className="p-3 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Search eg: infy bse, nifty fut, index fund, etc" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-md focus:outline-none" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                        {isSearchMode && <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600" title="Clear search"><X size={16} /></button>}
                    </div>
                </div>
            </div>

            {!isSearchMode && (
                <div className="border-b border-gray-200">
                    <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex items-center text-sm text-gray-600">
                            {isRenaming ? (
                                <div ref={renameRef} className="flex items-center space-x-2">
                                    <input type="text" value={newWatchlistName} onChange={(e) => setNewWatchlistName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleRenameWatchlist(); else if (e.key === 'Escape') cancelRenaming(); }} className="px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none" autoFocus maxLength={20} />
                                    <button onClick={handleRenameWatchlist} className="text-green-600 hover:text-green-800" title="Save"><Check size={14} /></button>
                                    <button onClick={cancelRenaming} className="text-red-600 hover:text-red-800" title="Cancel"><X size={14} /></button>
                                </div>
                            ) : (
                                <>
                                    {activeWatchlist} ({currentStocks.length})
                                    <button onClick={startRenaming} className="ml-2 text-gray-400 hover:text-gray-600" title="Rename watchlist"><Pencil size={14} /></button>
                                </>
                            )}
                        </div>
                        {!isRenaming && (
                            <div className="relative">
                                <button ref={sortButtonRef} onClick={() => setShowSortDropdown(p => !p)} className="p-1 hover:bg-gray-200 rounded"><ArrowDownUp size={14} /></button>
                                {showSortDropdown && (
                                    <div ref={sortDropdownRef} className="absolute right-0 mt-1 bg-gray-100 border border-gray-300 shadow-lg rounded w-44 z-50">
                                        {['AZ', 'LTP', 'CHANGE'].map((type) => (
                                            <div key={type} className="flex items-center justify-between px-2 py-1 border-b last:border-b-0">
                                                <span className="text-sm">{type === 'AZ' ? 'A–Z' : type === 'LTP' ? 'LTP' : '% Change'}</span>
                                                <div className="flex space-x-1">
                                                    <button onClick={() => { sortWatchlist(type as any, 'ASC'); setShowSortDropdown(false); }} className="p-1 bg-gray-200 rounded hover:bg-gray-300">▲</button>
                                                    <button onClick={() => { sortWatchlist(type as any, 'DESC'); setShowSortDropdown(false); }} className="p-1 bg-gray-200 rounded hover:bg-gray-300">▼</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {isSearchMode && (
                <div className="border-b border-gray-200">
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="text-sm text-gray-600">Search Results ({filteredStocks.length})</div>
                    <div className="text-xs text-gray-500">Add to {activeWatchlist}</div>
                  </div>
                </div>
              )}

            <div className="flex-1 overflow-y-auto" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                {filteredStocks.map((stock, index) => {
                    const isBeingDragged = sourceIndex === index;
                    const transform = (isDragging && dragOverIndex !== null && (index > sourceIndex && index <= dragOverIndex)) ? `translateY(-52px)` : (isDragging && dragOverIndex !== null && (index < sourceIndex && index >= dragOverIndex)) ? `translateY(52px)` : 'translateY(0)';
                    const isExpanded = expandedStockSymbol === stock.symbol;

                    return (
                        <React.Fragment key={stock.symbol}>
                            <div 
                                onDragOver={(e) => !isSearchMode && handleDragOver(e, index)} 
                                style={{ transform }} 
                                className={`pl-3 py-2 border-b group flex items-center bg-white ${isBeingDragged ? 'opacity-0' : 'opacity-100'} ${!isDropping ? 'transition-transform duration-300' : ''}`}
                            >
                                {!isSearchMode && <div draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnd={handleDragEnd} className={`text-gray-400 touch-none pr-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} onClick={(e) => e.stopPropagation()}><GripVertical size={18} /></div>}
                                <div className={`justify-between items-center w-full flex ${isSearchMode ? 'pr-3' : ''}`}>
                                    <div className="flex-1 min-w-0"><div className="flex items-center"><span className="font-medium text-xs">{stock.symbol}</span><span className="ml-2 text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">{stock.index}</span></div></div>
                                    <div className="flex items-center pr-3">
                                        {!isSearchMode && (
                                            // --- START OF THE FIX ---
                                            <div className="relative w-40 flex justify-end items-center h-8">
                                                {/* Price/Change info now fades out instead of being removed from the layout */}
                                                <div className="text-right transition-opacity duration-200 group-hover:opacity-0">
                                                    <div className="font-medium text-sm">{stock.price.toFixed(2)}</div>
                                                    <div className={`flex items-center justify-end text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                                        <span>{stock.changePercent.toFixed(2)}%</span>
                                                        <span className="ml-1">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                {/* Buttons are absolutely positioned and fade in */}
                                                <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex space-x-2 opacity-0 transition-opacity duration-200 pointer-events-none ${isDragging ? '' : 'group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                                                    <button onClick={(e) => { e.stopPropagation(); handleToggleMarketDepth(stock.symbol); }} className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600" title="Market Depth"><MoreHorizontal size={12} /></button>
                                                    <button onClick={(e) => { e.stopPropagation(); removeStock(stock.symbol); }} className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700" title="Delete"><Trash2 size={12} /></button>
                                                    {stock.index !== 'INDEX' && (<>
                                                        <button onClick={(e) => handleBuySell(stock, 'BUY', e)} className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">B</button>
                                                        <button onClick={(e) => handleBuySell(stock, 'SELL', e)} className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">S</button>
                                                    </>)}
                                                </div>
                                            </div>
                                            // --- END OF THE FIX ---
                                        )}
                                        {isSearchMode && (
                                            <>
                                                <div className="text-right mr-2"><div className="font-medium text-sm">{stock.price.toFixed(2)}</div><div className={`flex items-center justify-end text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}<span>{stock.changePercent.toFixed(2)}%</span><span className="ml-1">{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span></div></div>
                                                <button onClick={(e) => { e.stopPropagation(); toggleStockInWatchlist(stock); }} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isStockInWatchlist(stock.symbol) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-500'}`}>{isStockInWatchlist(stock.symbol) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                                {isExpanded && <MarketDepthView stock={stock} />}
                            </div>
                        </React.Fragment>
                    )
                })}
                {filteredStocks.length === 0 && isSearchMode && <div className="text-center py-8"><p className="text-gray-500">No stocks found for "{searchQuery}"</p></div>}
            </div>

            <div className="border-t bg-gray-50">
                <div className="grid grid-cols-7">
                    {watchlistOrder.map((name, index) => (<button key={name} onClick={() => { setActiveWatchlist(name); setSearchQuery(''); }} className={`py-3 text-sm font-medium border-r last:border-r-0 ${activeWatchlist === name ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>))}
                </div>
            </div>

            {orderWindow && <OrderWindow stock={orderWindow.stock} initialOrderType={orderWindow.orderType} onClose={() => setOrderWindow(null)} />}
        </div>
    );
};

export default Watchlist;