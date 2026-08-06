import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema({
  name:   { type: String, required: true, unique: true, trim: true },
  parent: { type: String, default: null, trim: true },
}, { timestamps: true })

export const Category = models.Category || model('Category', CategorySchema)
