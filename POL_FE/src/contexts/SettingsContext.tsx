import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings, updateSettings as updateSettingsApi, type Settings } from '@/api/settingsApi';

interface SettingsContextValue {
  settings: Settings | null;
  loading: boolean;
  refetch: () => Promise<void>;
  updateSettings: (newSettings: Settings) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await getSettings();
    if (data && !error) {
      setSettings(data);
    }
    setLoading(false);
  };

  const updateSettings = async (newSettings: Settings) => {
    const { data, error } = await updateSettingsApi(newSettings);
    if (data && !error) {
      setSettings(data);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refetch: fetchSettings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
