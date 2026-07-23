import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const SideBar = () => {
  const list = [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
      icon: <i className="ri-dashboard-line"></i>,
    },
    {
      title: "Products",
      link: "/admin/products",
      icon: <i className="ri-shopping-bag-line"></i>,
    },
    {
      title: "Users",
      link: "/admin/users",
      icon: <i className="ri-group-line"></i>,
    },
    {
      title: "Orders",
      link: "/admin/orders",
      icon: <i className="ri-file-list-3-line"></i>,
    },
  ]
   

  /** Logout handler */
  const { logout } = useAuth();

  return (
    <>
      <aside className="h-full z-40 bg-background-50 border-r border-background-200/70 transition-all duration-300 flex flex-col w-[260px]">
        <div className="flex items-center h-16 px-5 border-b border-background-200/70">
          <Link to="/">
            <span className="font-heading text-xl font-bold text-foreground-950 whitespace-nowrap">
              Admin<span className="text-primary-500">Panel</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-4">
            <p className="px-3 mb-2 text-xs font-semibold text-foreground-400 uppercase tracking-wider">
              Main
            </p>
            {list?.map((item) => (
              <Link
                to={item.link}
                key={item.title}
                className="flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap group text-foreground-600 hover:bg-background-100 hover:text-foreground-900 "
                data-discover="true"
              >
                <span className="w-5 h-5 flex items-center justify-center text-foreground-400 group-hover:text-foreground-600">
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="p-3 border-t border-background-200/70">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <i className="ri-logout-box-line"></i>
            Sign Out
          </button>
        </div>
      </aside>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around py-2">
        {list?.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="flex flex-col items-center gap-1 px-3 py-1 text-xs rounded-lg transition-colors text-primary"
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};
