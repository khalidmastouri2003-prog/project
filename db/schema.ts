import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  businessName: text("business_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const products = pgTable("products", {
  id: serial().primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text().notNull(),
  sku: text(),
  buyPrice: numeric("buy_price", { precision: 10, scale: 2 }).notNull(),
  sellPrice: numeric("sell_price", { precision: 10, scale: 2 }).notNull(),
  stockQuantity: integer("stock_quantity").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orders = pgTable("orders", {
  id: serial().primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  total: numeric({ precision: 10, scale: 2 }).notNull(),
  profit: numeric({ precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const orderItems = pgTable("order_items", {
  id: serial().primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  productName: text("product_name").notNull(),
  quantity: integer().notNull(),
  unitSellPrice: numeric("unit_sell_price", { precision: 10, scale: 2 }).notNull(),
  unitBuyPrice: numeric("unit_buy_price", { precision: 10, scale: 2 }).notNull(),
  lineTotal: numeric("line_total", { precision: 10, scale: 2 }).notNull(),
  lineProfit: numeric("line_profit", { precision: 10, scale: 2 }).notNull(),
})
