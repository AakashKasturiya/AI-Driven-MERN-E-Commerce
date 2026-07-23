import { useState, useEffect } from "react";
import { getAllOrders } from "../../../api/orders";
import { getProducts } from "../../../api/products";
import { getUsers } from "../../../api/admin/user";

const formatCurrency = (value) => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const CardLayout = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    pendingCount: 0,
    productsCount: 0,
    activeProductsCount: 0,
    customersCount: 0,
    activeCustomersCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ordersRes, productsRes, usersRes] = await Promise.all([
          getAllOrders(),
          getProducts(),
          getUsers(),
        ]);

        const orders = ordersRes.data.orders || [];
        const products = productsRes.data.products || productsRes.data || [];
        const users = usersRes.data.users || usersRes.data || [];

        const revenue = orders.reduce(
          (sum, order) => sum + (Number(order.total) || 0),
          0,
        );

        const pendingCount = orders.filter((order) => {
          const status = (order.orderStatus || "").toLowerCase();
          return status === "processing" || status === "pending" || !status;
        }).length;

        // Adjust field name if your product schema uses something else
        // (e.g. isActive, status === "active", stock > 0)
        const activeProductsCount = products.filter(
          (p) => p.isActive !== false,
        ).length;

        // Adjust field name if your user schema uses something else
        // (e.g. isActive, status === "active", role !== "banned")
        const activeCustomersCount = users.filter(
          (u) => u.isActive !== false,
        ).length;

        setStats({
          revenue,
          ordersCount: orders.length,
          pendingCount,
          productsCount: products.length,
          activeProductsCount,
          customersCount: users.length,
          activeCustomersCount,
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch dashboard stats",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-5 h-[104px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl border border-border p-5">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  const cards = [
    {
      label: "Revenue",
      value: formatCurrency(stats.revenue),
      sub: null,
      subClass: "text-emerald-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-dollar-sign h-5 w-5 text-accent-foreground"
        >
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      label: "Orders",
      value: stats.ordersCount,
      sub: `${stats.pendingCount} pending`,
      subClass: "text-muted-foreground",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-cart h-5 w-5 text-accent-foreground"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      ),
    },
    {
      label: "Products",
      value: stats.productsCount,
      sub: `${stats.activeProductsCount} active`,
      subClass: "text-muted-foreground",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-package h-5 w-5 text-accent-foreground"
        >
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
          <path d="M12 22V12"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <path d="m7.5 4.27 9 5.15"></path>
        </svg>
      ),
    },
    {
      label: "Customers",
      value: stats.customersCount,
      sub: `${stats.activeCustomersCount} active`,
      subClass: "text-muted-foreground",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-users h-5 w-5 text-accent-foreground"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card rounded-xl border border-border p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {card.label}
              </p>
              <p className="text-2xl font-bold mt-1 text-foreground">
                {card.value}
              </p>
              {card.sub && (
                <p className={`text-xs mt-1 ${card.subClass}`}>{card.sub}</p>
              )}
            </div>
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};