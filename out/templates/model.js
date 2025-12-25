"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelTemplate = void 0;
const modelTemplate = (entityName, fields) => {
    const schemaFields = fields.map(f => {
        const isArray = f.type.endsWith('[]');
        const baseType = isArray ? f.type.slice(0, -2) : f.type;
        const typeMap = {
            string: 'String',
            number: 'Number',
            boolean: 'Boolean',
            date: 'Date'
        };
        const mappedType = typeMap[baseType.toLowerCase()] || 'String';
        const finalType = isArray ? `[${mappedType}]` : mappedType;
        return `    ${f.key}: {\n        type: ${finalType},\n        required: true\n    }`;
    }).join(',\n');
    return `import mongoose from 'mongoose';

const schema = new mongoose.Schema({
${schemaFields}
}, { timestamps: true });

export default mongoose.model("${entityName}", schema);
`;
};
exports.modelTemplate = modelTemplate;
//# sourceMappingURL=model.js.map