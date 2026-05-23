import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Creating homepage_products table...");
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS homepage_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        href VARCHAR(255) NOT NULL,
        sort_order INT DEFAULT 0
      )
    `);

    const [rows] = await connection.execute("SELECT COUNT(*) as count FROM homepage_products");
    if ((rows as any)[0].count === 0) {
      console.log("Seeding homepage_products table...");
      const products = [
        {
          title: "LED Display Systems",
          category: "Visual Hardware",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
          href: "/products/led-display-systems",
          sort_order: 1
        },
        {
          title: "Interactive Kiosks",
          category: "Engagement",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
          href: "/products/lcd-screens-interactive-kiosks",
          sort_order: 2
        },
        {
          title: "Lighting Systems",
          category: "Atmosphere",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
          href: "/products/lighting-systems",
          sort_order: 3
        },
        {
          title: "Professional Audio",
          category: "Infrastructure",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
          href: "/products/professional-audio-systems",
          sort_order: 4
        },
        {
          title: "Power Solutions",
          category: "Integration",
          image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80",
          href: "/products/power-distribution-cable-solutions",
          sort_order: 5
        }
      ];

      for (const p of products) {
        await connection.execute(
          "INSERT INTO homepage_products (title, category, image, href, sort_order) VALUES (?, ?, ?, ?, ?)",
          [p.title, p.category, p.image, p.href, p.sort_order]
        );
      }
      console.log("Seed complete.");
    } else {
      console.log("Table already has data, skipping seed.");
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await connection.end();
  }
}

run();
