import axios from 'axios'

const api  = axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategoria: (categoria) => api.get(`http://localhost:3001/categorias/${categoria}`),
    getCategorias : () => api.get('categorias'),
    deleteCategoria : catId => api.delete(`categorias/${catId}`),
    postCategoria: categoria => api.post('categorias', categoria),
    editCategoria: categoria => api.put(`categorias/${categoria.id}`, categoria),
}

export default apis