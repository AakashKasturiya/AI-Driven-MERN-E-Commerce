import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";



export const Header = () => {

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!accountRef.current) return;
      if (!accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!showSearch) return;

    const timer = setTimeout(() => {
      if (search.trim()) {
        navigate(`/collections?search=${encodeURIComponent(search)}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, showSearch, navigate]);


  useEffect(() => {
    if (location.pathname !== "/collections") {
      setShowSearch(false);
      setSearch("");
    }
  }, [location.pathname]);


  /** Logout handler */
  const { logout } = useAuth();

  const { count: cartCount } = useCart();

  const { count } = useWishlist();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navigationList = [
  {
    name: "AI Stylist",
    link: "/ai-stylist"
  }, {
    name: "Collections",
    link: "/collections"
  },
  {
    name: "About",
    link: "/about"
  }]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/"
              className="flex items-center gap-2"
              data-discover="true"
            >
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 text-charcoal">
                VELORA
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {
                navigationList.map((item) => (
                  <Link key={item.name} to={item.link}
                    className="text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 text-charcoal"
                    data-discover="true"
                  >
                    {item.name}
                  </Link>
                ))
              }
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="relative flex items-center">
                {showSearch && (
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        navigate(`/collections?search=${encodeURIComponent(search)}`);
                      }
                    }}
                    placeholder="Search products..."
                    className="w-72 border border-gray-200 rounded-xl py-2 pl-4 pr-10 text-sm outline-none transition-all"
                  />
                )}

                <button
                  onClick={() => setShowSearch((prev) => !prev)}
                  className="w-10 h-10 flex items-center justify-center text-charcoal"
                >
                  <i className={`${showSearch ? "ri-close-line" : "ri-search-line"} text-lg`} />
                </button>
              </div>
              <Link to="/wishlist"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-300 relative text-charcoal"
                aria-label="Wishlist"
                data-discover="true"
              >
                <i className="ri-heart-line text-lg"></i>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              </Link>
              <Link to="/cart"
                className="w-10 h-10 flex items-center justify-center transition-colors duration-300 relative text-charcoal"
                aria-label="Cart"
                data-discover="true"
              >
                <i className="ri-shopping-bag-line text-lg"></i>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-300 text-charcoal"
                  aria-label="Account"
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                >
                  <i className="ri-user-line text-lg"></i>
                </button>
                {isAccountOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
                    <div className="flex gap-2 items-center  px-4 py-3">
                      <i className="ri-user-line text-lg"></i>
                      <span className="text-sm font-medium text-charcoal">{user?.email || ""}</span>
                    </div>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-gray-100 flex items-center gap-2"
                      onClick={logout}
                    >
                      <i className="ri-logout-box-line text-lg"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal"
              aria-label="Menu"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}