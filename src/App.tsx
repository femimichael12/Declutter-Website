import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ToastProvider } from '@/context/ToastContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { CompareProvider } from '@/context/CompareContext';
import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AuthPage } from '@/pages/AuthPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { ComparePage } from '@/pages/ComparePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { FAQPage } from '@/pages/FAQPage';
import { PrivacyPolicyPage, TermsPage, ReturnPolicyPage, DeliveryInfoPage } from '@/pages/PolicyPages';
import { AccountLayout, ProfilePage } from '@/pages/account/AccountLayout';
import { OrdersPage } from '@/pages/account/OrdersPage';
import { AddressesPage } from '@/pages/account/AddressesPage';
import { NotificationsPage } from '@/pages/account/NotificationsPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminProducts } from '@/pages/admin/AdminProducts';
import { AdminCategories } from '@/pages/admin/AdminCategories';
import { AdminOrders } from '@/pages/admin/AdminOrders';
import { AdminCustomers } from '@/pages/admin/AdminCustomers';
import { AdminCoupons } from '@/pages/admin/AdminCoupons';
import { AdminBanners } from '@/pages/admin/AdminBanners';
import { AdminReviews } from '@/pages/admin/AdminReviews';
import { AdminSettings } from '@/pages/admin/AdminSettings';

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <RecentlyViewedProvider>
                  <CompareProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <Routes>
                        <Route element={<Layout />}>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/products" element={<ProductsPage />} />
                          <Route path="/product/:slug" element={<ProductDetailsPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/wishlist" element={<WishlistPage />} />
                          <Route path="/compare" element={<ComparePage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/faq" element={<FAQPage />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                          <Route path="/return-policy" element={<ReturnPolicyPage />} />
                          <Route path="/delivery" element={<DeliveryInfoPage />} />
                          <Route path="/login" element={<AuthPage mode="login" />} />
                          <Route path="/signup" element={<AuthPage mode="signup" />} />
                          <Route path="/reset-password" element={<ResetPasswordPage />} />
                          <Route path="/account" element={<AccountLayout />}>
                            <Route index element={<ProfilePage />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="addresses" element={<AddressesPage />} />
                            <Route path="notifications" element={<NotificationsPage />} />
                          </Route>
                        </Route>
                        <Route path="/admin" element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="products" element={<AdminProducts />} />
                          <Route path="categories" element={<AdminCategories />} />
                          <Route path="orders" element={<AdminOrders />} />
                          <Route path="customers" element={<AdminCustomers />} />
                          <Route path="coupons" element={<AdminCoupons />} />
                          <Route path="banners" element={<AdminBanners />} />
                          <Route path="reviews" element={<AdminReviews />} />
                          <Route path="settings" element={<AdminSettings />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </CompareProvider>
                </RecentlyViewedProvider>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
