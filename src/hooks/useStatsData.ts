
import { useQuery } from '@tanstack/react-query';

interface StatsResponse {
  success: boolean;
  data: {
    summary: {
      total_requests: string;
      avg_response_time: string;
      server_errors: string;
      client_errors: string;
    };
    endpoints: Array<{
      endpoint: string;
      total: string;
    }>;
    daily: Array<{
      day: string;
      total: string;
    }>;
  };
}

const fetchStats = async (apiKey: string): Promise<StatsResponse> => {
  const response = await fetch('/stats', {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status}`);
  }

  return response.json();
};

export const useStatsData = (apiKey: string) => {
  return useQuery({
    queryKey: ['stats', apiKey],
    queryFn: () => fetchStats(apiKey),
    enabled: !!apiKey,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
