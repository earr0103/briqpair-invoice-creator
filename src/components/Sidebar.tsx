import { FileText, Home, CreditCard, Users, Settings, LogOut, Package, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: FileText, label: "Invoices", path: "/invoices" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">BriqPair</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <button className="sidebar-link w-full">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};