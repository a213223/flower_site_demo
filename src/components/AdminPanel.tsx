import React, { useState, useEffect, useMemo } from 'react';
import { Order, OrderStatus } from '../types';
import {
  getStoredOrders,
  updateOrderStatus,
  deleteOrder,
  resetOrdersToDefault,
  setAdminAuth,
  subscribeToOrders
} from '../data/storage';
import {
  Store,
  LogOut,
  RefreshCcw,
  Search,
  Clock,
  Phone,
  MapPin,
  Mail,
  Trash2,
  TrendingUp,
  PackageCheck,
  Receipt,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AdminPanelProps {
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToStore }) => {
  const [orders, setOrders] = useState<Order[]>(getStoredOrders());
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notification, setNotification] = useState<string | null>(null);

  // Subscribe to real-time order updates
  useEffect(() => {
    const unsubscribe = subscribeToOrders(() => {
      setOrders(getStoredOrders());
      setLastUpdated(new Date());
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    setAdminAuth(false);
    onBackToStore();
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showNotice(`Статус заказа ${orderId} обновлен на «${getStatusLabel(newStatus)}»`);
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить заказ ${orderId}?`)) {
      deleteOrder(orderId);
      showNotice(`Заказ ${orderId} удален`);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Сбросить базу к 3 исходным тестовым заказам?')) {
      resetOrdersToDefault();
      showNotice('База данных восстановлена к начальным значениям');
    }
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const newOrdersCount = orders.filter(o => o.status === 'new').length;
    // Non-cancelled orders for revenue
    const validOrders = orders.filter(o => o.status !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
    const avgCheck = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;
    return {
      newOrdersCount,
      totalRevenue,
      avgCheck,
      totalOrders: orders.length
    };
  }, [orders]);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    let result = orders;

    if (activeTab !== 'all') {
      result = result.filter(o => o.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
      case 'new': return 'Новый';
      case 'assembling': return 'Собирается';
      case 'courier': return 'Передан курьеру';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return 'bg-botanika-terracotta/15 text-botanika-terracotta border-botanika-terracotta/40';
      case 'assembling':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'courier':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'completed':
        return 'bg-botanika-olive/15 text-botanika-olive border-botanika-olive/40';
      case 'cancelled':
        return 'bg-neutral-100 text-neutral-600 border-neutral-300';
    }
  };

  const formatOrderTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) +
        ', ' + date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-botanika-bg text-botanika-text">
      
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-30 bg-botanika-card border-b border-botanika-border px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-[0.18em] text-botanika-text uppercase font-semibold">
              БОТАНИКА
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-botanika-olive text-white">
              Кабинет флориста
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleResetData}
              title="Восстановить исходные 3 заказа для демонстрации"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-botanika-border hover:bg-botanika-bg text-botanika-muted hover:text-botanika-text transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Сбросить демо-данные</span>
            </button>

            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-botanika-olive hover:bg-botanika-oliveDeep text-white font-medium transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Перейти на сайт</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-botanika-border hover:bg-botanika-terracotta/10 text-botanika-muted hover:text-botanika-terracotta transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast notification */}
        {notification && (
          <div className="p-3 bg-botanika-olive text-white text-xs rounded-sm shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{notification}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="p-1 hover:opacity-75"
              aria-label="Закрыть уведомление"
            >
              ×
            </button>
          </div>
        )}

        {/* 1. Metrics Strip (Prompt Requirement) */}
        <section aria-labelledby="metrics-title">
          <h2 id="metrics-title" className="sr-only">Сводка показателей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric: New Orders */}
            <div className="p-5 bg-botanika-card/50 border border-botanika-border rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-botanika-muted block mb-1">
                  Новых заказов
                </span>
                <span className="font-serif text-3xl font-bold text-botanika-terracotta">
                  {metrics.newOrdersCount}
                </span>
                <span className="text-[11px] text-botanika-subtle block mt-0.5">
                  требуют подтверждения
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-botanika-terracotta/10 flex items-center justify-center text-botanika-terracotta">
                <AlertCircle className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>

            {/* Metric: Revenue Today */}
            <div className="p-5 bg-botanika-card/50 border border-botanika-border rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-botanika-muted block mb-1">
                  Выручка за сегодня
                </span>
                <span className="font-serif text-3xl font-bold text-botanika-olive">
                  {metrics.totalRevenue.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-[11px] text-botanika-subtle block mt-0.5">
                  активные заказы
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-botanika-olive/10 flex items-center justify-center text-botanika-olive">
                <TrendingUp className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>

            {/* Metric: Average Check */}
            <div className="p-5 bg-botanika-card/50 border border-botanika-border rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-botanika-muted block mb-1">
                  Средний чек
                </span>
                <span className="font-serif text-3xl font-bold text-botanika-text">
                  {metrics.avgCheck.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-[11px] text-botanika-subtle block mt-0.5">
                  на один заказ
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-botanika-card border border-botanika-border flex items-center justify-center text-botanika-text">
                <Receipt className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>

            {/* Metric: Total Orders */}
            <div className="p-5 bg-botanika-card/50 border border-botanika-border rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-botanika-muted block mb-1">
                  Всего в журнале
                </span>
                <span className="font-serif text-3xl font-bold text-botanika-text">
                  {metrics.totalOrders}
                </span>
                <span className="text-[11px] text-botanika-subtle block mt-0.5">
                  обновлено в {lastUpdated.toLocaleTimeString('ru-RU')}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-botanika-card border border-botanika-border flex items-center justify-center text-botanika-subtle">
                <PackageCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Controls & Search Bar */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
              {[
                { id: 'all', label: 'Все заказы' },
                { id: 'new', label: 'Новые' },
                { id: 'assembling', label: 'Собирается' },
                { id: 'courier', label: 'У курьера' },
                { id: 'completed', label: 'Выполнен' },
                { id: 'cancelled', label: 'Отменен' },
              ].map(tab => {
                const isActive = activeTab === tab.id;
                const count = tab.id === 'all'
                  ? orders.length
                  : orders.filter(o => o.status === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-botanika-olive text-white'
                        : 'bg-botanika-card hover:bg-botanika-card/80 text-botanika-muted hover:text-botanika-text border border-botanika-border/60'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-botanika-border text-botanika-subtle'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-botanika-subtle absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по номеру, имени или телефону..."
                className="w-full text-xs pl-9 pr-4 py-2 rounded-sm border border-botanika-border bg-botanika-card/50 text-botanika-text placeholder:text-botanika-subtle focus:outline-none focus:ring-1 focus:ring-botanika-olive"
              />
            </div>

          </div>
        </section>

        {/* 3. Orders List (Real-time cards) */}
        <section aria-labelledby="orders-list-title">
          <h2 id="orders-list-title" className="sr-only">Список заказов</h2>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-20 bg-botanika-card/30 border border-botanika-border rounded-sm">
              <p className="editorial-heading text-2xl text-botanika-text mb-2">
                Заказов не найдено
              </p>
              <p className="text-xs text-botanika-muted mb-4">
                {searchQuery ? 'Попробуйте изменить поисковый запрос' : 'В выбранном статусе сейчас нет заказов'}
              </p>
              {(searchQuery || activeTab !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="px-4 py-2 bg-botanika-olive text-white text-xs rounded-sm font-medium"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="bg-botanika-card/40 border border-botanika-border rounded-sm p-6 hover:border-botanika-borderDark transition-colors space-y-5"
                  >
                    {/* Top Row: Order ID, Time, Status Selector, Delete */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-botanika-border">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-botanika-text">
                          № {order.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-botanika-muted">
                          <Clock className="w-3.5 h-3.5 text-botanika-subtle" />
                          <span>{formatOrderTime(order.createdAt)}</span>
                        </div>
                        {order.status === 'new' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-botanika-terracotta text-white animate-pulse">
                            Новый заказ
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Live Status Select */}
                        <div className="flex items-center gap-2">
                          <label htmlFor={`status-${order.id}`} className="text-xs text-botanika-muted sr-only">
                            Статус
                          </label>
                          <select
                            id={`status-${order.id}`}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-semibold py-1.5 px-3 rounded-sm border cursor-pointer focus:outline-none focus:ring-1 focus:ring-botanika-olive ${getStatusBadge(order.status)}`}
                          >
                            <option value="new">Новый</option>
                            <option value="assembling">Собирается</option>
                            <option value="courier">Передан курьеру</option>
                            <option value="completed">Выполнен</option>
                            <option value="cancelled">Отменен</option>
                          </select>
                        </div>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          className="p-1.5 text-botanika-subtle hover:text-botanika-terracotta transition-colors rounded"
                          title="Удалить заказ"
                          aria-label="Удалить заказ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Grid: Client & Delivery Info vs Items */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                      
                      {/* Left: Client & Delivery Details (5 cols) */}
                      <div className="md:col-span-5 space-y-2.5 pr-4 border-r-0 md:border-r border-botanika-border">
                        <div>
                          <span className="text-botanika-subtle text-[11px] block">Клиент:</span>
                          <span className="font-semibold text-botanika-text text-sm">
                            {order.customerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-botanika-olive flex-shrink-0" />
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="font-medium text-botanika-text hover:text-botanika-olive transition-colors"
                          >
                            {order.customerPhone}
                          </a>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-botanika-olive mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-botanika-text block">{order.address}</span>
                            <span className="text-[11px] text-botanika-subtle">
                              {order.fulfillmentType === 'delivery' ? 'Курьерская доставка' : 'Самовывоз из студии'} • {order.deliveryDate}, {order.deliveryWindow}
                            </span>
                          </div>
                        </div>

                        {order.courierComment && (
                          <div className="p-2.5 bg-botanika-bg rounded-sm border border-botanika-border/60 text-[11px] text-botanika-muted">
                            <strong className="text-botanika-text">Комментарий:</strong> {order.courierComment}
                          </div>
                        )}
                      </div>

                      {/* Right: Items list & Greeting Postcard (7 cols) */}
                      <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                        
                        {/* Items Breakdown */}
                        <div className="space-y-2">
                          <span className="text-botanika-subtle text-[11px] block">Состав заказа:</span>
                          <div className="space-y-1.5">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-2 rounded-sm bg-botanika-bg border border-botanika-border/60"
                              >
                                <div>
                                  <span className="font-semibold text-botanika-text">{item.title}</span>
                                  <span className="text-botanika-subtle ml-2">
                                    размер {item.sizeLabel || item.size} × {item.quantity} шт.
                                  </span>
                                </div>
                                <span className="font-medium text-botanika-text font-mono">
                                  {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Free Postcard preview */}
                        {order.postcard && order.postcardText ? (
                          <div className="p-3 bg-botanika-bg rounded-sm border border-botanika-border space-y-1">
                            <div className="flex items-center gap-1.5 text-botanika-olive font-semibold text-[11px]">
                              <Mail className="w-3.5 h-3.5" />
                              <span>Текст на открытке:</span>
                            </div>
                            <p className="italic text-botanika-text font-serif text-sm">
                              «{order.postcardText}»
                            </p>
                          </div>
                        ) : (
                          <div className="text-[11px] text-botanika-subtle">
                            Открытка не запрошена
                          </div>
                        )}

                        {/* Financial Totals */}
                        <div className="pt-2 border-t border-botanika-border flex items-baseline justify-between">
                          <div className="text-[11px] text-botanika-subtle space-x-3">
                            <span>Букеты: {order.subtotal.toLocaleString('ru-RU')} ₽</span>
                            {order.discount > 0 && <span>Скидка: -{order.discount.toLocaleString('ru-RU')} ₽</span>}
                            <span>Доставка: {order.deliveryCost === 0 ? '0 ₽' : `${order.deliveryCost} ₽`}</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-botanika-subtle mr-2">Итого:</span>
                            <span className="font-serif text-xl font-bold text-botanika-text">
                              {order.total.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};
