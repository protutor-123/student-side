'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form action={action} className="w-full max-w-sm space-y-5 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-navy">Protutor360 Blog</h1>
          <p className="mt-1 text-sm text-zinc-500">Sign in to manage posts.</p>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">Password</span>
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
          />
        </label>
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-accent-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-blue-hover disabled:opacity-60"
        >
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
