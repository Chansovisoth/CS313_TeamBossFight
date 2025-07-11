// ===== LIBRARIES ===== //
import { useLocation } from "react-router-dom";

// ===== PAGE TITLE COMPONENT ===== //
export function PageTitle({ className = "text-lg font-semibold text-foreground" }) {
  const location = useLocation();
  
  // Function to get page title from pathname
  const getPageTitle = (pathname) => {
    const routes = {
      '/': 'Home',
      '/about': 'About',
      '/badges': 'Badges',
      '/qr': 'QR Scanner',
      '/boss-battle': 'Boss Battle',
      '/authentication': 'Authentication',
      '/leaderboard': 'Leaderboard'
    };
    
    // Handle nested routes
    if (pathname.includes('/boss-battle')) return 'Boss Battle';
    if (pathname.includes('/authentication')) return 'Authentication';
    if (pathname.includes('/admin')) return 'Admin Panel';
    if (pathname.includes('/host')) return 'Host Panel';
    if (pathname.includes('/leaderboard')) return 'Leaderboard';
    
    return routes[pathname] || 'UniRAID';
  };

  return (
    <h1 className={className}>
      {getPageTitle(location.pathname)}
    </h1>
  );
}

export default PageTitle;
