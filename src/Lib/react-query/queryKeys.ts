export const queryKeys = {
  transactions: ["transactions"] as const,
  transaction: (id: number) => ["transactions", id] as const,

  user: ["user"] as const,
  userProfile: ["user", "profile"] as const,

  products: ["products"] as const,
  product: (id: number) => ["products", id] as const,
  featuredProducts: ["products", "featured"] as const,
} as const;
