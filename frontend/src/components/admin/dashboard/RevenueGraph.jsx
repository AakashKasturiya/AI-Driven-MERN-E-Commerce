import { useState, useEffect, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAllOrders } from "../../../api/orders";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatCurrency = (value) => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        margin: 0,
        padding: "10px",
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(229, 231, 235)",
        whiteSpace: "nowrap",
        borderRadius: "8px",
      }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, fontSize: "12px" }}>
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

export const RevenueChart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch revenue data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const chartData = useMemo(() => {
    // Build last 7 days (oldest -> newest), each bucket keyed by date string
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push({
        key: d.toDateString(),
        label: DAY_LABELS[d.getDay()],
        revenue: 0,
      });
    }

    const bucketByKey = Object.fromEntries(days.map((d) => [d.key, d]));

    orders.forEach((order) => {
      if (!order.createdAt) return;
      // Skip cancelled orders from revenue — adjust if your business logic differs
      if ((order.orderStatus || "").toLowerCase() === "cancelled") return;

      const created = new Date(order.createdAt);
      const key = created.toDateString();
      const bucket = bucketByKey[key];
      if (bucket) {
        bucket.revenue += Number(order.total) || 0;
      }
    });

    return days;
  }, [orders]);

  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="lg:col-span-2">
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-foreground mb-4">
          Revenue (7 days)
        </h3>

        {loading && (
          <div className="h-[240px] flex items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        )}

        {error && !loading && (
          <div className="h-[240px] flex items-center justify-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {totalRevenue === 0 ? (
              <div className="h-[240px] flex items-center justify-center text-sm text-muted-foreground">
                No revenue in the last 7 days.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(245, 58%, 51%)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(245, 58%, 51%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(220, 10%, 46%)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(220, 10%, 46%)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(245, 58%, 51%)"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};