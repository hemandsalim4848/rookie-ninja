import { Schema, model, models } from 'mongoose'

const ProductSchema = new Schema({
  brand:       { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  brandSlug:   { type: String, required: true },
  name:        { type: String, required: true },
  slug:        { type: String, required: true },
  sku:         { type: String, default: '' },
  images:      [{ type: String }],
  description:      { type: String, default: '' },
shortDescription: { type: String, default: '' },
  specs:       [{ key: String, value: String }],
  category:    { type: String, default: '' },
  tags:        [{ type: String }],
  featured:    { type: Boolean, default: false },
}, { timestamps: true })

ProductSchema.index({ brandSlug: 1, slug: 1 }, { unique: true })

export const Product = models.Product || model('Product', ProductSchema)