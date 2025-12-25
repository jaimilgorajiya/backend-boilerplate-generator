"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbTemplate = void 0;
exports.dbTemplate = `import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern_boilerplate');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
`;
//# sourceMappingURL=db.js.map