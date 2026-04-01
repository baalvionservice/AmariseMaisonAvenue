// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubItem {
    id: string;
    label: string;
  }
  
  export interface SidebarNavItem {
    id: string;
    label: string;
    subItems?: SubItem[];
  }
  
  export interface SidebarSection {
    id: string;
    label: string;
    items: SidebarNavItem[];
  }
  
  export interface ColorOption {
    name: string;
    count: number;
    hex?: string;
    isMulti?: boolean;
    border?: boolean;
  }
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    isNew?: boolean;
  }
  
  export interface FilterState {
    color: string[];
    hardware: string[];
    size: string[];
    style: string[];
    priceMin: number;
    priceMax: number;
  }
  
  // ─── Price Constants ──────────────────────────────────────────────────────────
  
  export const PRICE_ABSOLUTE_MIN = 0;
  export const PRICE_ABSOLUTE_MAX = 500000;
  export const PRICE_DEFAULT_MIN = 78445;
  export const PRICE_DEFAULT_MAX = 245500;
  
  // ─── Sidebar Navigation Data ──────────────────────────────────────────────────
  
  export const HERMES_SIDEBAR: SidebarSection[] = [
    {
      id: "handbags",
      label: "HANDBAGS",
      items: [
        {
          id: "birkin",
          label: "Birkin Bags",
          subItems: [
            { id: "birkin-25cm", label: "Birkin 25CM" },
            { id: "birkin-30cm", label: "Birkin 30CM" },
            { id: "birkin-35cm", label: "Birkin 35CM" },
            { id: "birkin-40cm", label: "Birkin 40+CM" },
            { id: "birkin-shoulder", label: "Shoulder Birkins" },
          ],
        },
        {
          id: "kelly",
          label: "Kelly Bags",
          subItems: [
            { id: "kelly-20cm", label: "Kelly 20CM" },
            { id: "kelly-25cm", label: "Kelly 25CM" },
            { id: "kelly-28cm", label: "Kelly 28CM" },
            { id: "kelly-32cm", label: "Kelly 32CM" },
            { id: "kelly-35cm", label: "Kelly 35CM+" },
          ],
        },
        {
          id: "constance",
          label: "Constance Bags",
          subItems: [
            { id: "constance-18cm", label: "Constance 18CM" },
            { id: "constance-24cm", label: "Constance 24/25CM" },
          ],
        },
        { id: "pochettes", label: "Pochettes & Kelly Cuts" },
        { id: "hss", label: "Horseshoe Stamp (HSS) Bags" },
        {
          id: "evelyne",
          label: "Evelyne Bags",
          subItems: [{ id: "mini-evelyne", label: "Mini Evelyne (TPM) Bags" }],
        },
        { id: "picotin", label: "Picotin Bags" },
        { id: "lindy", label: "Lindy Bags" },
        { id: "herbag", label: "Herbag Bags" },
        { id: "other-bags", label: "Other Bags" },
      ],
    },
    {
      id: "accessories",
      label: "ACCESSORIES",
      items: [
        { id: "wallets", label: "Wallets" },
        { id: "watches", label: "Watches" },
        { id: "belts", label: "Belts" },
        { id: "charms", label: "Charms" },
        { id: "scarves", label: "Scarves" },
        { id: "shoes", label: "Shoes" },
        { id: "jewelry-acc", label: "Jewelry" },
      ],
    },
    {
      id: "shoes",
      label: "SHOES",
      items: [
        { id: "wallets", label: "Wallets" },
        { id: "watches", label: "Watches" },
        { id: "belts", label: "Belts" },
        { id: "charms", label: "Charms" },
        { id: "scarves", label: "Scarves" },
        { id: "shoes", label: "Shoes" },
        { id: "jewelry-acc", label: "Jewelry" },
      ],
    },
    {
      id: "curations",
      label: "CURATIONS",
      items: [
        { id: "new-arrivals", label: "New Arrivals" },
        { id: "best-sellers", label: "Best Sellers" },
        { id: "exotic", label: "Exotic Handbags" },
        { id: "rare", label: "Rare & Unique Bags" },
        { id: "hss-curation", label: "HSS Horseshoe Stamp Bags" },
        { id: "pre-owned", label: "Pre-Owned & Vintage Handbags" },
        { id: "home-goods", label: "Home Goods" },
        { id: "atelier", label: "Atelier Bags" },
        { id: "palm-beach", label: "Palm Beach Collection" },
      ],
    },
  ];
  
  // ─── Filter Options ───────────────────────────────────────────────────────────
  
  export const COLORS: ColorOption[] = [
    { name: "Beige", count: 14, hex: "#C8A97A" },
    { name: "Black", count: 43, hex: "#0a0a0a" },
    { name: "Blue", count: 99, hex: "#3B5998" },
    { name: "Multi", count: 12, isMulti: true },
    { name: "Pink", count: 50, hex: "#E8829B" },
    { name: "Ivory", count: 29, hex: "#F8F4EC", border: true },
    { name: "Orange", count: 22, hex: "#E8622A" },
    { name: "Red", count: 18, hex: "#C0392B" },
    { name: "Green", count: 31, hex: "#2D6A4F" },
    { name: "Brown", count: 27, hex: "#7D5A3C" },
    { name: "Grey", count: 15, hex: "#8B8B8B" },
    { name: "White", count: 11, hex: "#FFFFFF", border: true },
    { name: "Gold", count: 8, hex: "#C9A84C" },
    { name: "Burgundy", count: 19, hex: "#722F37" },
  ];
  
  export const HARDWARE_OPTIONS = [
    "Gold",
    "Silver",
    "Palladium",
    "Brushed Gold",
    "Rose Gold",
    "Ruthenium",
    "Black Hardware",
    "Permabrass",
  ];
  
  export const SIZE_OPTIONS = [
    "Mini",
    "25cm",
    "28cm",
    "30cm",
    "32cm",
    "35cm",
    "40cm+",
  ];
  
  export const STYLE_OPTIONS = [
    "Birkin",
    "Kelly",
    "Constance",
    "Evelyne",
    "Picotin",
    "Lindy",
    "Herbag",
    "Other",
  ];
  
  // ─── Mock Products ────────────────────────────────────────────────────────────
  
  export const PRODUCTS: Product[] = [
    {
      id: "prod-1",
      name: "Hermès Special Order (HSS) Birkin 25 White and Etoupe Clemence Brushed Gold Hardware",
      price: 31741.89,
      imageUrl: "https://picsum.photos/seed/hermes-birkin-1/600/750",
      isNew: true,
    },
    {
      id: "prod-2",
      name: "Hermès Special Order (HSS) Birkin 25 White and Rose Sakura Clemence Rose Gold Hardware",
      price: 33481.17,
      imageUrl: "https://picsum.photos/seed/hermes-birkin-2/600/750",
      isNew: true,
    },
    {
      id: "prod-3",
      name: "Hermès Birkin 25 New White Swift Palladium Hardware",
      price: 27393.69,
      imageUrl: "https://picsum.photos/seed/hermes-birkin-3/600/750",
      isNew: true,
    },
    {
      id: "prod-4",
      name: "Hermès Kelly 28 Sellier Gold Togo Gold Hardware",
      price: 24800.00,
      imageUrl: "https://picsum.photos/seed/hermes-kelly-4/600/750",
    },
    {
      id: "prod-5",
      name: "Hermès Constance 24 Black Epsom Gold Hardware",
      price: 18950.00,
      imageUrl: "https://picsum.photos/seed/hermes-constance-5/600/750",
    },
    {
      id: "prod-6",
      name: "Hermès Birkin 30 Orange Togo Gold Hardware Brand New",
      price: 29500.00,
      imageUrl: "https://picsum.photos/seed/hermes-birkin-6/600/750",
      isNew: true,
    },
  ];
  
  // ─── Format Helpers ───────────────────────────────────────────────────────────
  
  export const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);
  
  export const formatPriceShort = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);