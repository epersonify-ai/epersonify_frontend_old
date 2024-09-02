'use client';

import { useState } from 'react';
import CardList from './cardList';
import NavigationTab from './navigationTab';
import ProfileHeader from './profileHeader';
import { TabKey } from './types';

export default function Component() {
  const [activeTab, setActiveTab] = useState<TabKey>('characters');

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-half max-w-xl mx-auto p-4">
        <div className="mt-12">
          <ProfileHeader />
        </div>
        <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <CardList activeTab={activeTab} />
      </div>
    </div>
  );
}
