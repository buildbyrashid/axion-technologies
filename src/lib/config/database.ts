import { SupabaseProductRepository } from '../database/repositories/SupabaseProductRepository'
import { SupabaseCategoryRepository } from '../database/repositories/SupabaseCategoryRepository'
import { SupabaseContactRepository } from '../database/repositories/SupabaseContactRepository'
// Future: import { NodeJSProductRepository } from '../database/repositories/NodeJSProductRepository'

const DB_TYPE = process.env.DB_TYPE || 'supabase'

export function getProductRepository() {
  switch (DB_TYPE) {
    case 'supabase':
      return new SupabaseProductRepository()
    case 'nodejs':
      // return new NodeJSProductRepository(process.env.NODEJS_API_URL)
      throw new Error('Node.js backend not implemented yet')
    default:
      throw new Error(`Unsupported database type: ${DB_TYPE}`)
  }
}

export function getCategoryRepository() {
  switch (DB_TYPE) {
    case 'supabase':
      return new SupabaseCategoryRepository()
    case 'nodejs':
      // return new NodeJSCategoryRepository(process.env.NODEJS_API_URL)
      throw new Error('Node.js backend not implemented yet')
    default:
      throw new Error(`Unsupported database type: ${DB_TYPE}`)
  }
}

export function getContactRepository() {
  switch (DB_TYPE) {
    case 'supabase':
      return new SupabaseContactRepository()
    case 'nodejs':
      throw new Error('Node.js backend not implemented yet')
    default:
      throw new Error(`Unsupported database type: ${DB_TYPE}`)
  }
}
