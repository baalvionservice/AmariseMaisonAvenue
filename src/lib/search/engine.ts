/**
 * @fileOverview Advanced Search Engine Module.
 * Provides rule-based searching and filtering with RBAC enforcement.
 */

export type EntityType = 'listings' | 'leads' | 'content' | 'products';

/**
 * Universal Search & Filter Engine (Mock)
 * Designed to be replaced with a real Search API (Algolia/ES).
 */
export function applyAdvancedSearch<T>(
  data: T[],
  query: string = "",
  filters: Record<string, any> = {},
  role?: string,
  userCountry?: string
): T[] {
  let results = [...data];

  // 1. RBAC + Country Isolation Enforcement
  if (role && role !== "super_admin" && userCountry && userCountry !== 'GLOBAL') {
    results = results.filter((item: any) => {
      // Handle both "country" and "countryCode" fields
      const itemCountry = (item.country || item.countryCode || "").toLowerCase();
      return itemCountry === userCountry.toLowerCase() || item.isGlobal === true;
    });
  }

  // 2. Keyword Search (Across all string fields)
  if (query) {
    const q = query.toLowerCase();
    results = results.filter((item: any) => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(q)
      )
    );
  }

  // 3. Attribute Filters
  Object.entries(filters).forEach(([key, val]) => {
    if (val && val !== 'all') {
      results = results.filter((item: any) => {
        if (key === "priceRange" && Array.isArray(val)) {
          const price = item.basePrice || item.price;
          return price >= val[0] && price <= val[1];
        }
        return String(item[key]).toLowerCase() === String(val).toLowerCase();
      });
    }
  });

  return results;
}
