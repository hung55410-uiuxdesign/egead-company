'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { Card, Button, TextInput, Field, useToast } from '@astryxdesign/core';
import { useAdminBootstrap, useAdminLogin } from '@/lib/hooks';

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { data: sessionData, isPending: sessionPending } = useSession();

  useEffect(() => {
    if (!sessionPending && sessionData?.session) {
      router.replace('/admin');
    }
  }, [sessionPending, sessionData, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    dbStatus,
  } = useAdminBootstrap();

  const { login, isLoggingIn } = useAdminLogin({
    onSuccess: () => {
      setSuccess('Đăng nhập thành công! Đang chuyển hướng vào bảng điều khiển...');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!dbStatus.dbConnected) {
      const msg = 'Chưa thể đăng nhập vì chưa kết nối được cơ sở dữ liệu MySQL. Vui lòng cập nhật chuỗi DATABASE_URL trong file .env và thử lại.';
      setError(msg);
      toast({
        body: msg,
        type: 'error',
        isAutoHide: true,
        autoHideDuration: 6000,
      });
      return;
    }

    login({ email: email.trim(), password });
  };

  return (
    <div
      className="min-h-screen w-full text-slate-900 flex flex-col justify-center items-center lg:items-end px-6 sm:px-12 lg:pr-20 xl:pr-32 2xl:pr-40 py-12 relative overflow-hidden font-mona-sans selection:text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/admin/bg.png')",
      }}
    >
      <div className="w-full max-w-lg sm:max-w-[1100px] z-10 relative flex flex-col items-center">
        <Card
          variant="default"
          style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}
          className='w-full max-w-[600px] pb-20'
        >
          <div className="text-center p-12">
            <h1 className="text-3xl font-medium text-slate-900">
              Đăng nhập
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Hệ thống quản trị nội dung &amp; Bài viết (CMS)
            </p>
          </div>

          {/* Status Alerts */}
          {error && (
            <div className="mx-20 mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start animate-fadeIn">
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 px-20">
            <TextInput
              id="admin-login-email"
              label="Email quản trị"
              type="email"
              isRequired
              value={email}
              onChange={(val) => setEmail(val)}
              placeholder="Email"
              startIcon={<Mail className="w-5 h-5 text-slate-400" />}
              width="100%"
              autoComplete="email"
              isDisabled={isLoggingIn}
              className="h-12 border text-gray-800 font-medium text-sm"
            />

            <Field label="Mật khẩu" inputID="admin-login-password" isRequired>
              <div className="relative">
                <TextInput
                  id="admin-login-password"
                  isLabelHidden
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(val) => setPassword(val)}
                  placeholder="••••••••••••"
                  startIcon={<Lock className="w-5 h-5 text-slate-400" />}
                  width="100%"
                  autoComplete="current-password"
                  isDisabled={isLoggingIn}
                  className="h-12 border text-gray-800 font-medium text-sm pr-12"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    isIconOnly
                    icon={
                      showPassword ? (
                        <EyeOff className="w-5 h-5 text-slate-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-slate-500" />
                      )
                    }
                    label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>
            </Field>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                width="100%"
                label={isLoggingIn ? 'Đang xác thực...' : 'Đăng nhập hệ thống'}
                isLoading={isLoggingIn}
                isDisabled={isLoggingIn}
                className="h-12 text-sm font-semibold"
              />
            </div>

            {/* Divider "hoặc" */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-500 font-medium">
                  hoặc
                </span>
              </div>
            </div>

            {/* Support Contact Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                width="100%"
                label="Liên hệ qua Telegram"
                icon={
                  <Image
                    src="/admin/telegram.svg"
                    alt="Telegram"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                }
                className="h-12 border border-slate-200 text-slate-800 text-sm font-medium hover:bg-slate-50/80 transition-colors"
                onClick={() => {
                  window.open('https://t.me/hung55410', '_blank');
                }}
              />

              <Button
                type="button"
                variant="secondary"
                size="lg"
                width="100%"
                label="Liên hệ qua Zalo"
                icon={
                  <Image
                    src="/admin/zalo.svg"
                    alt="Zalo"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                }
                className="h-12 border border-slate-200 text-slate-800 text-sm font-medium hover:bg-slate-50/80 transition-colors"
                onClick={() => {
                  window.open('https://zalo.me/0386545891', '_blank');
                }}
              />
            </div>

            <div className="pt-1 text-center">
              <p className="text-xs text-slate-400">
                Bộ phận quản trị sẽ hỗ trợ xác minh và cấp lại quyền truy cập.
              </p>
            </div>
          </form>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-800">
          © {new Date().getFullYear()} E-GEAD Inc. Bảo mật bởi Edric & Nguyen Hung Studio.
        </div>
      </div>
    </div>
  );
}
