export const MOCK_CATEGORIES = [
  { id: '1', name: 'LED Display Systems', slug: 'led-display-systems', tagline: 'Next-gen visual clarity', description: 'Advanced LED panels for indoor and outdoor use.', sort_order: 0, is_active: true },
  { id: '2', name: 'Interactive Solutions', slug: 'interactive-solutions', tagline: 'Engage your audience', description: 'Touchscreens, kiosks, and interactive software.', sort_order: 1, is_active: true },
  { id: '3', name: 'AV Infrastructure', slug: 'av-infrastructure', tagline: 'Solid foundations', description: 'Mounts, cables, and signal management.', sort_order: 2, is_active: false },
]

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'AX-Series Ultra Fine Pitch',
    slug: 'ax-series-ultra-fine',
    category_id: '1',
    short_description: 'The pinnacle of LED resolution.',
    full_description: '<p>The AX-Series represents our most advanced LED technology to date...</p>',
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    categories: { name: 'LED Display Systems' },
    product_images: [{ image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', is_primary: true }],
    product_specifications: [{ spec_key: 'Brightness', spec_value: '1000 nits' }, { spec_key: 'Resolution', spec_value: '3840x2160' }],
    product_features: [{ title: 'HDR10 Support', description: 'Stunning contrast and color depth.' }],
    product_documents: [{ name: 'Datasheet', document_type: 'datasheet', file_url: '#' }],
    product_applications: [{ image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', caption: 'Control Room', location: 'London' }]
  },
  {
    id: 'p2',
    name: 'Interactive Touch Table',
    slug: 'interactive-touch-table',
    category_id: '2',
    short_description: 'Collaborative surface for modern meetings.',
    full_description: '<p>4K touch surface with multi-user support.</p>',
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    categories: { name: 'Interactive Solutions' },
    product_images: [{ image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', is_primary: true }],
    product_specifications: [],
    product_features: [],
    product_documents: [],
    product_applications: []
  }
]

export const MOCK_INQUIRIES = [
  { id: 'i1', full_name: 'John Doe', company: 'Global Tech', email: 'john@example.com', phone: '+123456789', status: 'new', subject: 'Quote for AX-Series', message: 'I am interested in 50 panels for our new lobby.', created_at: new Date().toISOString(), country: 'USA' },
  { id: 'i2', full_name: 'Sarah Smith', company: 'Creative Agency', email: 'sarah@agency.com', phone: '+441234567', status: 'read', subject: 'Partnership Inquiry', message: 'We would love to discuss a long-term partnership.', created_at: new Date().toISOString(), country: 'UK' },
  { id: 'i3', full_name: 'Ahmed Ali', company: 'Retail Hub', email: 'ahmed@retail.ae', phone: '+971501234', status: 'closed', subject: 'Maintenance Question', message: 'How do I clean the interactive panels?', created_at: new Date().toISOString(), country: 'UAE' },
]

export const MOCK_OFFICES = [
  { id: 'o1', city: 'Dubai', country: 'UAE', role: 'HQ', address: 'Business Bay, Tower A', email: 'hq@axion.ae', phone: '+971 4 123 4567', is_headquarters: true },
  { id: 'o2', city: 'London', country: 'UK', role: 'Sales', address: 'Canary Wharf', email: 'uk@axion.com', phone: '+44 20 1234 5678', is_headquarters: false },
]

export const MOCK_STATS = {
  totalProducts: 42,
  totalCategories: 8,
  totalInquiries: 156,
  newInquiries: 12,
  activeProducts: 38
}
