import { CardLayout } from "../../components/admin/dashboard/CardLayout";
import { RecentOrders } from "../../components/admin/dashboard/RecentOrders";
import { RevenueChart } from "../../components/admin/dashboard/RevenueGraph";
import { TopProducts } from "../../components/admin/dashboard/TopProducts";


export const DashboardPage = () => {
  return (
    <>
        <main className="flex-1 overflow-y-auto">
          <div className="space-y-6 animate-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your store at a glance
              </p>
            </div>
            <CardLayout/>

            <div className="grid lg:grid-cols-3 gap-6">
              <RevenueChart/>
              
              <TopProducts/>
            </div>
               <RecentOrders/>
          </div>
        </main>
    </>
  );
};
