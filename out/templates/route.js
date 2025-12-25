"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTemplate = void 0;
const routeTemplate = (entityName) => {
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
exports.routeTemplate = routeTemplate;
//# sourceMappingURL=route.js.map