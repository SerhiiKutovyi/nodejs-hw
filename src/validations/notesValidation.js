import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// export const createNoteSchema = {
//   [Segments.PARAMS]: Joi.object({
//     page: Joi.number().integer().min(1).default(1),
//     perPage: Joi.number().integer().min(5).max(20).default(10),
//     tag: Joi.string(),
//     search: Joi.string(),
//   }),
// };

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        return isValidObjectId(value)
          ? value
          : helpers.message('Bad id format');
      })
      .required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom((value, helpers) => {
        return isValidObjectId(value)
          ? value
          : helpers.message('Bad id format');
      })
      .required(),
  }),
};
