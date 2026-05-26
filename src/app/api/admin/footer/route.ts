import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

// Helper to initialize table if it doesn't exist
async function ensureTableExists() {
  const sqlPath = path.join(process.cwd(), 'database', 'schema', '009_footer_settings.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  // Split statements by semicolon and execute them sequentially
  const statements = sql.split(';').filter(s => s.trim().length > 0);
  for (const stmt of statements) {
    await pool.query(stmt);
  }
}

export async function GET() {
  try {
    await ensureTableExists();
    
    const [rows]: any = await pool.query('SELECT * FROM footer_settings LIMIT 1');
    if (rows && rows.length > 0) {
      const data = rows[0];
      const safeParse = (val: any) => {
        if (typeof val === 'string') {
          try { return JSON.parse(val); } catch { return []; }
        }
        return val || [];
      };
      
      data.products_links = safeParse(data.products_links);
      data.solutions_links = safeParse(data.solutions_links);
      data.company_links = safeParse(data.company_links);
      
      return NextResponse.json({ success: true, data });
    }
    
    // If no row exists, insert the default and return it
    const defaultData = {
      id: 'footer-default',
      description: 'Engineering advanced visual technology solutions for global enterprise environments.',
      email: 'sales@axiontechnology.com',
      phone: '+852 2345 6789',
      address: 'Hong Kong | Shenzhen | Dubai',
      facebook_url: '#',
      twitter_url: '#',
      linkedin_url: '#',
      instagram_url: '#',
      whatsapp_number: '+852 2345 6789',
      products_links: [
        { name: "LED Display Systems", href: "#" },
        { name: "LCD & Kiosks", href: "#" },
        { name: "Lighting Systems", href: "#" },
        { name: "Audio Systems", href: "#" },
        { name: "Power Solutions", href: "#" }
      ],
      solutions_links: [
        { name: "Live Events", href: "#" },
        { name: "Corporate", href: "#" },
        { name: "Retail & Signage", href: "#" },
        { name: "Museums", href: "#" },
        { name: "Command Centers", href: "#" }
      ],
      company_links: [
        { name: "About Us", href: "#" },
        { name: "Our Process", href: "#" },
        { name: "Global Network", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ],
      copyright_text: 'Axion Technology Co Ltd. All rights reserved.'
    };

    const insertSql = `
      INSERT IGNORE INTO footer_settings (
        id, description, email, phone, address, facebook_url, twitter_url, 
        linkedin_url, instagram_url, whatsapp_number, products_links, 
        solutions_links, company_links, copyright_text
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query(insertSql, [
      defaultData.id, defaultData.description, defaultData.email, defaultData.phone,
      defaultData.address, defaultData.facebook_url, defaultData.twitter_url,
      defaultData.linkedin_url, defaultData.instagram_url, defaultData.whatsapp_number,
      JSON.stringify(defaultData.products_links),
      JSON.stringify(defaultData.solutions_links),
      JSON.stringify(defaultData.company_links),
      defaultData.copyright_text
    ]);

    return NextResponse.json({ success: true, data: defaultData });
    
    return NextResponse.json({ success: true, data: null });
  } catch (error: any) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    
    const body = await request.json();
    const {
      description,
      email,
      phone,
      address,
      facebook_url,
      twitter_url,
      linkedin_url,
      instagram_url,
      whatsapp_number,
      products_links,
      solutions_links,
      company_links,
      copyright_text
    } = body;
    
    const sql = `
      UPDATE footer_settings 
      SET 
        description = ?,
        email = ?,
        phone = ?,
        address = ?,
        facebook_url = ?,
        twitter_url = ?,
        linkedin_url = ?,
        instagram_url = ?,
        whatsapp_number = ?,
        products_links = ?,
        solutions_links = ?,
        company_links = ?,
        copyright_text = ?
      WHERE id = 'footer-default'
    `;
    
    await pool.query(sql, [
      description,
      email,
      phone,
      address,
      facebook_url,
      twitter_url,
      linkedin_url,
      instagram_url,
      whatsapp_number,
      JSON.stringify(products_links),
      JSON.stringify(solutions_links),
      JSON.stringify(company_links),
      copyright_text
    ]);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
