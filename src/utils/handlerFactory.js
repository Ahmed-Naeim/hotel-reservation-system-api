import { ApiError } from './ApiError.js';

export const deleteOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new ApiError(404, 'No document found with that ID'));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

export const updateOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return next(new ApiError(404, 'No document found with that ID'));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error) {
        next(error);
    }
};

export const createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getOne = (Model, popOptions) => async (req, res, next) => {
    try {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new ApiError(404, 'No document found with that ID'));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = Model => async (req, res, next) => {
    try {
        // Basic filtering (can be expanded)
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        const query = Model.find(queryObj);
        const docs = await query;

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: {
                data: docs
            }
        });
    } catch (error) {
        next(error);
    }
};