'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { Card, Button, Badge } from '@astryxdesign/core';

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: sessionData, isPending: sessionPending } = useSession();

  useEffect(() => {
    if (!sessionPending && sessionData?.session) {
      router.replace('/admin');
    }
  }, [sessionPending, sessionData, router]);

  const [email, setEmail] = useState('admin@egead.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [checkingDb, setCheckingDb] = useState(true);
  const [dbStatus, setDbStatus] = useState<{
    dbConnected: boolean;
    dbError: string | null;
    initialized: boolean;
  }>({
    dbConnected: false,
    dbError: null,
    initialized: false,
  });

  const checkStatus = async () => {
    setCheckingDb(true);
    try {
      const res = await fetch('/api/admin/bootstrap');
      const data = await res.json();
      if (data.success) {
        setDbStatus({
          dbConnected: Boolean(data.dbConnected),
          dbError: data.dbError || null,
          initialized: Boolean(data.initialized),
        });
      }
    } catch (e) {
      setDbStatus({
        dbConnected: false,
        dbError: (e as Error).message,
        initialized: false,
      });
    } finally {
      setCheckingDb(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!dbStatus.dbConnected) {
      setError(
        'Chưa thể đăng nhập vì chưa kết nối được cơ sở dữ liệu PostgreSQL. Vui lòng cập nhật chuỗi DATABASE_URL trong file .env và thử lại.'
      );
      setLoading(false);
      return;
    }

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            'Email hoặc mật khẩu không chính xác. Nếu chưa khởi tạo tài khoản, hãy nhấn nút "Khởi tạo tài khoản Admin" bên dưới.'
        );
        setLoading(false);
        return;
      }

      setSuccess('Đăng nhập thành công! Đang chuyển hướng vào bảng điều khiển...');
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 800);
    } catch (err) {
      const message = (err as Error).message;
      setError(`Lỗi xác thực: ${message}`);
      setLoading(false);
    }
  };

  const handleBootstrapAdmin = async () => {
    setIsBootstrapping(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/bootstrap', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSuccess(
          data.created
            ? 'Khởi tạo cấu trúc bảng & tài khoản Admin thành công! Bạn có thể đăng nhập ngay.'
            : 'Tài khoản Admin đã sẵn sàng trong Database.'
        );
        setEmail('admin@egead.com');
        setPassword('Admin@123456');
        checkStatus();
      } else {
        setError(data.error || 'Không thể khởi tạo tài khoản quản trị.');
      }
    } catch {
      setError('Lỗi kết nối khi khởi tạo tài khoản.');
    } finally {
      setIsBootstrapping(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-open-sans selection:bg-slate-900 selection:text-white">
      {/* Background subtle light ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/50 to-slate-200/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Top back link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center z-10">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <span>← Về trang chủ E-GEAD</span>
        </Link>
        <div className="text-xs text-slate-500 font-medium">
          <span>PostgreSQL &amp; Better Auth</span>
        </div>
      </div>

      {/* Main Login Card - Astryx Card in Light Mode */}
      <div className="w-full max-w-md z-10 relative">
        <Card variant="default">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-2xl mb-4">
                E
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                E-GEAD Admin Portal
              </h1>
              <p className="text-xs text-slate-500 mt-1.5">
                Hệ thống quản trị nội dung &amp; Bài viết (CMS)
              </p>
            </div>

            {/* Database Connection Notice Banner */}
            {!checkingDb && !dbStatus.dbConnected && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-800">
                  <span>Chưa kết nối PostgreSQL</span>
                  <button
                    type="button"
                    onClick={checkStatus}
                    className="hover:text-amber-950 text-[11px] underline font-semibold"
                  >
                    <span>Thử lại</span>
                  </button>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Hệ thống chưa kết nối được tới cơ sở dữ liệu PostgreSQL. Vui lòng mở file <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">.env</code> và điền chuỗi kết nối <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono">DATABASE_URL</code> thực tế của bạn (Postgres local, Neon, Supabase hoặc Docker).
                </p>
                {dbStatus.dbError && (
                  <p className="text-[10px] text-amber-900 font-mono bg-amber-100/70 p-2 rounded break-all border border-amber-200">
                    {dbStatus.dbError}
                  </p>
                )}
              </div>
            )}

            {!checkingDb && dbStatus.dbConnected && (
              <div className="mb-6 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                <span className="font-medium">
                  Đã kết nối PostgreSQL thành công!
                </span>
                <Badge label="Online" variant="success" />
              </div>
            )}

        {/* Status Alerts */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start animate-fadeIn">
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start animate-fadeIn">
            <span className="leading-relaxed font-medium">{success}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Email quản trị
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@egead.com"
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@egead.com');
                  setPassword('Admin@123456');
                }}
                className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
              >
                Điền mẫu mặc định
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              width="100%"
              label={loading ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
              isLoading={loading}
              isDisabled={loading}
            />
          </div>
        </form>

        {/* Default credentials card & auto bootstrap */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              Tài khoản cấp sẵn:
            </span>
            <Badge label="Role: Admin" variant="info" />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1 font-mono text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Email:</span>
              <span className="text-emerald-700 font-bold select-all">admin@egead.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Password:</span>
              <span className="text-slate-900 font-bold select-all">Admin@123456</span>
            </div>
          </div>

          {/* Seed admin button */}
          <Button
            type="button"
            variant="secondary"
            width="100%"
            onClick={handleBootstrapAdmin}
            isDisabled={isBootstrapping || (!dbStatus.dbConnected && !checkingDb)}
            isLoading={isBootstrapping}
            label={
              isBootstrapping
                ? 'Đang khởi tạo tài khoản & bảng dữ liệu...'
                : 'Khởi tạo tài khoản Admin & Cấu trúc bảng (Seed)'
            }
          />
        </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 z-10">
        © {new Date().getFullYear()} E-GEAD Inc. Bảo mật bởi Better Auth &amp; PostgreSQL.
      </div>
    </div>
  );
}
