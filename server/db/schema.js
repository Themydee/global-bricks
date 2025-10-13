import { pgTable, serial, text, varchar, timestamp, integer, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: text("password").notNull(),
    role: varchar("role", { length: 50 }).default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description").notNull(),
    location: varchar("location", { length: 200 }).notNull(),
    image: text("image").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    features: json("features").default([]).notNull(),
    year: varchar("year", { length: 10 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})