import { NextResponse } from 'next/server'
import { query } from '@/lib/db-helpers'

export async function GET() {
  try {
    // 1. Fetch active categories and subcategories
    const categories = await query<any[]>(`
      SELECT id, name, slug, parent_id, sort_order 
      FROM categories 
      WHERE is_active = 1 
      ORDER BY sort_order ASC, name ASC
    `)

    // 2. Fetch active products
    const products = await query<any[]>(`
      SELECT id, name, slug, category_id, subcategory_id, featured_image
      FROM products 
      WHERE is_active = 1 
      ORDER BY sort_order ASC, name ASC
    `)

    // 3. Separate main categories and subcategories
    const mainCategories = categories.filter(c => !c.parent_id)
    const subCategories = categories.filter(c => c.parent_id)

    // 4. Construct the tree structure matching navbar expectations
    const result = mainCategories.map(mainCat => {
      const activeSubcats = subCategories.filter(subCat => subCat.parent_id === mainCat.id)
      
      const subcategoriesData = activeSubcats.map(subCat => {
        // Find products belonging to this subcategory
        const subProducts = products.filter(p => p.subcategory_id === subCat.id)
        
        return {
          name: subCat.name,
          products: subProducts.map(p => ({
            name: p.name,
            image: p.featured_image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
            href: `/products/${mainCat.slug}/${subCat.slug}/${p.slug}` // Direct public detail page url or path
          }))
        }
      }).filter(sub => sub.products.length > 0) // Only include subcategories with products

      return {
        name: mainCat.name,
        href: `/products/${mainCat.slug}`,
        subcategories: subcategoriesData
      }
    }).filter(cat => cat.subcategories.length > 0) // Only include main categories with content

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (err: any) {
    console.error('Navbar products navigation api error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
