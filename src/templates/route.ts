export const routeTemplate = (entityName: string) => {
    return `import express from 'express';
import * as controller from '../controllers/${entityName}.Controller.js';

const router = express.Router();

router.post('/', controller.create${entityName});
router.get('/', controller.getAll${entityName}s);
router.get('/:id', controller.get${entityName}ById);
router.put('/:id', controller.update${entityName});
router.delete('/:id', controller.delete${entityName});

export default router;
`;
};
