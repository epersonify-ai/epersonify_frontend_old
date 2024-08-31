'use client';

import { useState } from 'react';
import CardList from '../../components/ui/profile/cardList';
import Header from '../../components/ui/profile/header';
import NavigationTab from '../../components/ui/profile/navigationTab';
import { TabKey } from '../../components/ui/profile/types';

export default function Component() {
  const [activeTab, setActiveTab] = useState<TabKey>('characters');

  return (
      <div className="min-h-screen w-half max-w-xl mx-auto p-4">
        <div className="mt-12">
          <Header />
        </div>
        <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <CardList activeTab={activeTab} />
      </div>
  );
}
