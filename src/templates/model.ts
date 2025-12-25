export const modelTemplate = (entityName: string, fields: { key: string, type: string }[]) => {
    const schemaFields = fields.map(f => {
        const isArray = f.type.endsWith('[]');
        const baseType = isArray ? f.type.slice(0, -2) : f.type;

        const typeMap: { [key: string]: string } = {
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
