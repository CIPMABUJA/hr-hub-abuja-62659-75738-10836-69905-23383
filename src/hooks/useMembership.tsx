import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function useMembership() {
  const { user } = useAuth();
  const [membership, setMembership] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMembership();
    }
  }, [user]);

  const fetchMembership = async () => {
    if (!user) return;

    setIsLoading(true);
    const { data, error } = await supabase
      .from('memberships')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching membership:', error);
    } else {
      setMembership(data);
    }
    setIsLoading(false);
  };

  const calculateDaysRemaining = () => {
    if (!membership?.expiry_date) return 0;
    const today = new Date();
    const expiry = new Date(membership.expiry_date);
    const diff = expiry.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calculateProgress = () => {
    if (!membership?.join_date || !membership?.expiry_date) return 0;
    const start = new Date(membership.join_date);
    const end = new Date(membership.expiry_date);
    const today = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  return {
    membership,
    isLoading,
    daysRemaining: calculateDaysRemaining(),
    progress: calculateProgress(),
    refetch: fetchMembership,
  };
}
