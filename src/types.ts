export interface Endpoint {
  endpoint: string;
  total: string;
}

export interface DailyStat {
  day: string;
  total: string;
}

export interface Summary {
  total_requests: string;
  avg_response_time: string;
  server_errors: string;
  client_errors: string;
}

export interface StatsData {
  data: {
    endpoints: Endpoint[];
    daily: DailyStat[];
    summary: Summary;
  };
}

export interface EndpointTableData {
  name: string;
  requests: number;
  percentage: number;
  fullEndpoint: string;
}

export interface DailyChartData {
  date: string;
  requests: number;
}

export interface RequestStatusData {
  name: string;
  value: number;
  color: string;
}