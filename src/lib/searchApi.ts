import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  markdown?: string;
}

export interface SearchResponse {
  success: boolean;
  data?: SearchResult[];
  error?: string;
}

type TimeFilter = 'any' | 'day' | 'week' | 'month' | 'year';

const timeFilterMap: Record<TimeFilter, string | undefined> = {
  any: undefined,
  day: 'qdr:d',
  week: 'qdr:w',
  month: 'qdr:m',
  year: 'qdr:y',
};

export async function searchWeb(query: string, options?: { limit?: number; timeFilter?: TimeFilter }): Promise<SearchResponse> {
  const { data, error } = await supabase.functions.invoke('web-search', {
    body: {
      query,
      options: {
        limit: options?.limit || 10,
        tbs: options?.timeFilter ? timeFilterMap[options.timeFilter] : undefined,
      },
    },
  });

  if (error) {
    console.error('Search error:', error);
    return { success: false, error: error.message };
  }

  console.log('Raw search response:', data);

  // Transform Firecrawl response to our format - check multiple possible data structures
  const rawResults = data?.data || data?.results || [];
  
  if (data?.success !== false && rawResults.length > 0) {
    const results: SearchResult[] = rawResults.map((item: any) => ({
      title: item.title || item.metadata?.title || 'Untitled',
      url: item.url || item.metadata?.sourceURL || '#',
      description: item.description || item.metadata?.description || item.markdown?.slice(0, 200) || 'No description available',
      markdown: item.markdown,
    }));
    return { success: true, data: results };
  }

  // If we got a response but no results, still consider it successful but with empty results
  if (data?.success !== false) {
    return { success: true, data: [] };
  }

  return { success: false, error: data?.error || 'Unknown error' };
}
