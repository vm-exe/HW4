"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// Rutas
router.get('/', productController_1.getAllProducts); // Obtener todos los productos
router.post('/', productController_1.createProduct); // Crear un producto
router.put('/:id', productController_1.updateProduct); // Actualizar un producto
router.delete('/:id', productController_1.deleteProduct); // Eliminar un producto
exports.default = router;
