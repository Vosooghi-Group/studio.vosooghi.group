import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { user } from './user'
import { showcase } from './showcase'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog , user , showcase , category],
}
