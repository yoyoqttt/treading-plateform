import React, { useState } from "react";
import OrderWindow from "./OrderWindow";

interface Order {
  id: string;
  time: string;
  type: "BUY" | "SELL";
  instrument: string;
  exchange: string;
  product: string;
  qty: number;
  price: number;
  status: "COMPLETE" | "PENDING" | "CANCELLED";
}

// Utility: Format instrument name with exchange
const formatInstrument = (instrument: string, exchange: string) => {
  return `${instrument} (${exchange})`;
};

// Utility: Status color
const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "COMPLETE":
      return "bg-green-100 text-green-800 border-green-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "";
  }
};

const Orders: React.FC = () => {
  // Open Orders state
  const [openOrdersState, setOpenOrdersState] = useState<Order[]>([
    {
      id: "1",
      time: "09:15:01",
      type: "BUY",
      instrument: "HDFCBANK",
      exchange: "NSE",
      product: "CNC",
      qty: 10,
      price: 1500.5,
      status: "PENDING",
    },
    {
      id: "2",
      time: "09:20:45",
      type: "SELL",
      instrument: "RELIANCE",
      exchange: "BSE",
      product: "MIS",
      qty: 5,
      price: 2450.75,
      status: "PENDING",
    },
  ]);

  const executedOrders: Order[] = [
    {
      id: "3",
      time: "09:30:15",
      type: "BUY",
      instrument: "INFY",
      exchange: "NSE",
      product: "CNC",
      qty: 8,
      price: 1620.35,
      status: "COMPLETE",
    },
    {
      id: "4",
      time: "09:45:10",
      type: "SELL",
      instrument: "TCS",
      exchange: "BSE",
      product: "MIS",
      qty: 3,
      price: 3200.0,
      status: "COMPLETE",
    },
  ];

  // Cancel Dialog state
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);

  // Modify state
  const [orderToModify, setOrderToModify] = useState<Order | null>(null);

  // Filtering
  const filteredOpenOrders = openOrdersState.filter(
    (order) => order.status === "PENDING"
  );

  return (
    <div className=" space-y-8">
      {/* Open Orders Section */}
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">
            Open orders ({filteredOpenOrders.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOpenOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        order.type === "BUY"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatInstrument(order.instrument, order.exchange)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 text-sm">{order.product}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 text-sm">{order.qty}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700 text-sm">
                      {order.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-4">
                    <button
                      onClick={() => setOrderToModify(order)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => {
                        setOrderToCancel(order);
                        setShowCancelDialog(true);
                      }}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOpenOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No open orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executed Orders Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-700">
            Executed orders ({executedOrders.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {executedOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        order.type === "BUY"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatInstrument(order.instrument, order.exchange)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && orderToCancel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setShowCancelDialog(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Cancel Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel order{" "}
              <span className="font-semibold">{orderToCancel.instrument}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setOpenOrdersState(
                    openOrdersState.filter((o) => o.id !== orderToCancel.id)
                  );
                  setShowCancelDialog(false);
                }}
                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Order Window */}
      {orderToModify && (
        <OrderWindow
          stock={{
            symbol: orderToModify.instrument,
            price: orderToModify.price,
            exchange: orderToModify.exchange,
            name: orderToModify.instrument,
          }}
          initialOrderType={orderToModify.type}
          onClose={() => setOrderToModify(null)}
          modifyMode={true} // 👈 added flag
        />
      )}
    </div>
  );
};

export default Orders;
