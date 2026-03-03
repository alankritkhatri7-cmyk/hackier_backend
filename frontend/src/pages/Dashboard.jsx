import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  LayoutDashboard, Package, CreditCard, LogOut, Eye, EyeOff,
  CheckCircle2, XCircle, Clock, Loader2, ChevronRight, Sparkles,
  Building2, Mail, Calendar, Layers, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { tools } from '../data/tools';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb';
const PAYPAL_PLAN_ID = import.meta.env.VITE_PAYPAL_PLAN_ID || '';

// ── Helpers ───────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active: { cls: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: CheckCircle2, label: 'Active' },
    inactive: { cls: 'bg-slate-700/50 text-slate-400 border-slate-600', icon: Clock, label: 'Inactive' },
    cancelled: { cls: 'bg-red-500/15 text-red-400 border-red-500/30', icon: XCircle, label: 'Cancelled' },
  };
  const { cls, icon: Icon, label } = map[status] || map.inactive;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// ── Auth Form (Login / Signup) ─────────────────────────────────────────────────
function AuthForm() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ company_name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        if (!form.company_name.trim()) { setError('Company name is required.'); setSubmitting(false); return; }
        await signup(form.company_name, form.email, form.password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <img src="/Hackier.png" alt="Hackier" className="h-12 w-auto" />
            <span className="font-extrabold text-3xl tracking-tight text-white">Hackier</span>
          </div>
          <p className="text-slate-400 mt-2 text-sm">Business Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-4 text-sm font-semibold transition-colors capitalize ${
                  mode === m
                    ? 'text-white border-b-2 border-white bg-slate-900'
                    : 'text-slate-500 hover:text-slate-300 bg-slate-900/50'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="p-8 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    name="company_name"
                    value={form.company_name}
                    onChange={handle}
                    placeholder="Acme Inc."
                    className="w-full bg-slate-800 border border-slate-700 focus:border-white rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/20 text-sm transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="you@company.com"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-white rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/20 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  value={form.password}
                  onChange={handle}
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-white rounded-xl py-2.5 pl-4 pr-10 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-white/20 text-sm transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────────
function OverviewTab({ user, setTab }) {
  const stats = [
    { label: 'Tools Available', value: tools.length, icon: Layers, note: 'across all categories' },
    { label: 'Subscription', value: user?.subscription_status === 'active' ? 'Pro' : 'Free', icon: Sparkles, note: user?.subscription_status === 'active' ? 'All features unlocked' : 'Upgrade to Pro' },
    { label: 'Member Since', value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—', icon: Calendar, note: 'account created' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Welcome back{user?.company_name ? `, ${user.company_name}` : ''}!</h2>
        <p className="text-slate-400 text-sm mt-1">Here's your account overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</span>
              <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center">
                <Icon className="w-4 h-4 text-slate-300" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{note}</p>
          </div>
        ))}
      </div>

      {/* Account Info Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Account Details</h3>
        <div className="space-y-3">
          {[
            { label: 'Company', value: user?.company_name || '—' },
            { label: 'Email', value: user?.email || '—' },
            { label: 'Subscription Status', value: <StatusBadge status={user?.subscription_status || 'inactive'} /> },
            ...(user?.paypal_subscription_id ? [{ label: 'PayPal Subscription ID', value: <span className="font-mono text-xs text-slate-400">{user.paypal_subscription_id}</span> }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-xs text-slate-500">{label}</span>
              <span className="text-sm text-slate-200">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe CTA */}
      {user?.subscription_status !== 'active' && (
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">Upgrade to Pro Bundle</h3>
            <p className="text-sm text-slate-400 mt-1">$100/month — unlock all {tools.length}+ tools and replace your entire SaaS stack.</p>
          </div>
          <button
            onClick={() => setTab('billing')}
            className="flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all text-sm flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
}

// ── Tools Tab ─────────────────────────────────────────────────────────────────
function ToolsTab({ user, setTab }) {
  const isActive = user?.subscription_status === 'active';
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Your Tools</h2>
          <p className="text-slate-400 text-sm mt-1">{tools.length} tools in the bundle</p>
        </div>
        <StatusBadge status={user?.subscription_status || 'inactive'} />
      </div>

      {!isActive && (
        <div className="flex items-center justify-between gap-3 bg-amber-500/10 border border-amber-500/25 rounded-xl px-4 py-3 text-amber-400 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Subscribe to unlock full access to all tools.
          </div>
          <button
            onClick={() => setTab('billing')}
            className="flex items-center gap-1.5 bg-amber-500 text-slate-900 font-semibold px-4 py-1.5 rounded-lg hover:bg-amber-400 active:scale-[0.97] transition-all text-xs flex-shrink-0"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Subscribe
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className={`relative bg-slate-800/50 border rounded-xl p-4 flex flex-col items-center text-center gap-2 transition-all ${
              isActive
                ? 'border-slate-700/50 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer'
                : 'border-slate-800 opacity-50 cursor-not-allowed select-none'
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-8 h-8 object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-slate-900">${tool.name.charAt(0)}</span>`; }}
              />
            </div>
            <span className="text-xs font-medium text-slate-300 line-clamp-2">{tool.name}</span>
            {tool.category && <span className="text-[10px] text-slate-500">{tool.category}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Billing Tab ───────────────────────────────────────────────────────────────
function BillingTab({ user }) {
  const { token, refreshUser } = useAuth();
  const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [ppError, setPpError] = useState('');
  const [ppSuccess, setPpSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const isActive = user?.subscription_status === 'active';

  const handleApprove = async (data) => {
    setPpError('');
    setVerifying(true);
    try {
      const res = await fetch(`${API}/paypal/verify-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subscriptionID: data.subscriptionID }),
      });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.detail || 'Verification failed');
      }
      setPpSuccess(true);
      await refreshUser();
    } catch (err) {
      setPpError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Billing & Subscription</h2>
        <p className="text-slate-400 text-sm mt-1">Manage your Hackier subscription.</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Plan</p>
            <p className="text-2xl font-bold text-white">{isActive ? 'Pro Bundle' : 'Free'}</p>
          </div>
          <StatusBadge status={user?.subscription_status || 'inactive'} />
        </div>

        {isActive ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              Access to all {tools.length}+ tools in the bundle
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              Priority support
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              New tools added every month
            </div>
            {user?.paypal_subscription_id && (
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-700">
                Subscription ID: <span className="font-mono">{user.paypal_subscription_id}</span>
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Upgrade to Pro to unlock all tools.</p>
        )}
      </div>

      {/* Upgrade Section */}
      {!isActive && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Upgrade to Pro Bundle</h3>
          <p className="text-slate-400 text-sm mb-1">$100/month – replace your entire SaaS stack</p>

          <ul className="space-y-2 mb-6 mt-4">
            {[
              `${tools.length}+ premium tools included`,
              'No per-seat pricing',
              'Cancel anytime',
              'Instant access after payment',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {ppSuccess ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-4 text-emerald-400">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Subscription activated!</p>
                <p className="text-sm opacity-80">Your Pro access is now live.</p>
              </div>
            </div>
          ) : verifying ? (
            <div className="flex items-center justify-center gap-2 py-4 text-slate-400 text-sm">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying your subscription…
            </div>
          ) : PAYPAL_PLAN_ID ? (
            <PayPalScriptProvider
              options={{
                clientId: PAYPAL_CLIENT_ID,
                vault: true,
                intent: 'subscription',
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'subscribe' }}
                createSubscription={(data, actions) =>
                  actions.subscription.create({ plan_id: PAYPAL_PLAN_ID })
                }
                onApprove={handleApprove}
                onError={(err) => setPpError(String(err))}
              />
            </PayPalScriptProvider>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-4 py-3 text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              PayPal Plan ID not configured. Set <code className="font-mono text-xs">VITE_PAYPAL_PLAN_ID</code> in your .env file.
            </div>
          )}

          {ppError && (
            <div className="mt-3 flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {ppError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Dashboard Shell ─────────────────────────────────────────────────────────────
function DashboardShell({ user }) {
  const { logout } = useAuth();
  const [tab, setTab] = useState('overview');

  const nav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tools', label: 'Tools', icon: Package },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/Hackier.png" alt="Hackier" className="h-8 w-auto" />
              <span className="font-extrabold text-xl tracking-tight text-white">Hackier</span>
            </div>
            <span className="hidden sm:block h-5 w-px bg-slate-700" />
            <span className="hidden sm:block text-slate-400 text-sm">{user?.company_name || user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={user?.subscription_status || 'inactive'} />
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-48 flex-shrink-0 hidden md:block">
          <nav className="space-y-1">
            {nav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === id
                    ? 'bg-white text-slate-900 shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {tab === id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-40 flex">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                tab === id ? 'text-white' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {tab === 'overview' && <OverviewTab user={user} setTab={setTab} />}
          {tab === 'tools' && <ToolsTab user={user} setTab={setTab} />}
          {tab === 'billing' && <BillingTab user={user} />}
        </main>
      </div>
    </div>
  );
}

// ── Page Entry ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  if (!user) return <AuthForm />;
  return <DashboardShell user={user} />;
}
