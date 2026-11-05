import pool from '../config/db.js';

// GET /api/productos - Listar todos
export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM productos');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// POST /api/productos - Crear uno nuevo
export const createProducto = async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock]
        );
        res.status(201).json({ id: result.insertId, nombre, precio, stock });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

// PUT /api/productos/:id - Actualizar
export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, precio, stock, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ id, nombre, precio, stock });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

// DELETE /api/productos/:id - Eliminar
export const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute('DELETE FROM productos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};