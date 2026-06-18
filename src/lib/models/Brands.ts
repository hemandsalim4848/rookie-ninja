import { Schema, model, models } from 'mongoose'

const BrandSchema = new Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  logo:        { type: String, default: '' },
  description: { type: String, default: '' },
  country:     { type: String, default: '' },
  featured:    { type: Boolean, default: false },
}, { timestamps: true })

export const Brand = models.Brand || model('Brand', BrandSchema)