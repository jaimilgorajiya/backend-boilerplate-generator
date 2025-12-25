export const serverTemplate = (entityName: string) => {
    return `import express from 'express';
import connectDB from './config/db.js';
import itemRoutes from './routes/${entityName}.Routes.js';

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());

app.use('/api/${entityName.toLowerCase()}', itemRoutes);

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
`;
};
