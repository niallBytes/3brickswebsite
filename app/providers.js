'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizProvider } from '@/components/QuizProvider';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

function InstantLoadingBar() {
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'yf-loading-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:#F47B20;z-index:99999;transition:width 0.1s ease;pointer-events:none;opacity:1;';
    document.body.appendChild(bar);

    let timer = null;
    let width = 0;

    const start = () => {
      width = 0;
      bar.style.opacity = '1';
      bar.style.width = '0%';
      clearInterval(timer);
      timer = setInterval(() => {
        if (width < 30) {
          width += 10;
        } else if (width < 60) {
          width += 3;
        } else if (width < 85) {
          width += 0.5;
        } else {
          clearInterval(timer);
        }
        bar.style.width = width + '%';
      }, 50);
    };

    const finish = () => {
      clearInterval(timer);
      bar.style.width = '100%';
      setTimeout(() => {
        bar.style.opacity = '0';
        setTimeout(() => {
          bar.style.width = '0%';
        }, 300);
      }, 200);
    };

    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#') ||
        anchor.target === '_blank'
      ) return;
      start();
    };

    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        finish();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      observer.disconnect();
      clearInterval(timer);
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    };
  }, []);

  return null;
}

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <InstantLoadingBar />
        {children}
      </QuizProvider>
    </QueryClientProvider>
  );
}
