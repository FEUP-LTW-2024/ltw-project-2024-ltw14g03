PRAGMA foreign_keys = ON;

-- First, drop tables with foreign key dependencies
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS item_images;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS items;

-- Then drop tables that are referenced by foreign key constraints
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS conditions;

-- Create tables after all necessary drops
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, -- Store hashed passwords
    email TEXT UNIQUE NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT,
    zip TEXT,
    phone TEXT,
    profile_picture TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    is_admin INTEGER NOT NULL DEFAULT 0 -- 0: regular user, 1: admin user
);

CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE brands (
    brand_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE conditions (
    condition_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE sizes (
    size_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    seller_id INTEGER NOT NULL,
    category_id INTEGER,
    brand_id INTEGER,
    model TEXT NOT NULL,
    size_id INTEGER,
    condition_id INTEGER,
    price REAL NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'listed',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (seller_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
    FOREIGN KEY (condition_id) REFERENCES conditions(condition_id)
    FOREIGN KEY (size_id) REFERENCES sizes(size_id)
);

CREATE TABLE item_images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE wishlist (
    wishlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    added_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    buyer_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    transaction_date TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (buyer_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);


CREATE TABLE ratings (
    rating_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (item_id) REFERENCES items(item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE shopping_cart (
    shopping_cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    added_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (item_id) REFERENCES items(item_id)
);
