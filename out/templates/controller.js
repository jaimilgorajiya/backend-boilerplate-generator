"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerTemplate = void 0;
const controllerTemplate = (entityName) => {
    return `import ${entityName} from '../models/${entityName}.Models.js';

export const create${entityName} = async (req, res) => {
    try {
        const item = new ${entityName}(req.body);
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAll${entityName}s = async (req, res) => {
    try {
        const items = await ${entityName}.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const get${entityName}ById = async (req, res) => {
    try {
        const item = await ${entityName}.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "${entityName} not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const update${entityName} = async (req, res) => {
    try {
        const item = await ${entityName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: "${entityName} not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const delete${entityName} = async (req, res) => {
    try {
        const item = await ${entityName}.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "${entityName} not found" });
        res.status(200).json({ message: "${entityName} deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
`;
};
exports.controllerTemplate = controllerTemplate;
//# sourceMappingURL=controller.js.map