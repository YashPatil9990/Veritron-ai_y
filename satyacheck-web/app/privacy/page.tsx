import React from 'react';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy - Veritron',
  description: 'Privacy Policy for the Veritron Chrome extension - Learn how we handle and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <PrivacyPolicy />
    </main>
  );
}