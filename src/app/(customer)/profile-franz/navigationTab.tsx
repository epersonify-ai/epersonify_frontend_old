import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, ThumbsUp, User } from 'lucide-react';
import { TabKey } from './types';

type NavigationTabProps = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

const TabItems = [
  { id: 'characters', label: 'Characters', icon: <User className="w-4 h-4" /> },
  { id: 'liked', label: 'Liked', icon: <ThumbsUp className="w-4 h-4" /> },
  { id: 'personas', label: 'Personas', icon: <User className="w-4 h-4" /> },
  { id: 'voices', label: 'Voices', icon: <Mic className="w-4 h-4" /> },
];

export default function NavigationTab({ activeTab, setActiveTab }: NavigationTabProps) {
  return (
    <Tabs defaultValue="characters" className="mb-6">
      <TabsList className="grid w-full grid-cols-4">
        {TabItems.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} onClick={() => setActiveTab(tab.id as TabKey)}>
            {tab.icon}
            <span className="ml-2 hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
