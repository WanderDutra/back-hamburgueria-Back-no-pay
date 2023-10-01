
const cors = require('cors')
const express = require('express')
const uuid = require('uuid')
const port = 3005
const app = express()
app.use(express.json())
app.use(cors())
const pedidos = []

const checkPedidoId = (request, response, next) => {
    const { id } = request.params
    const index = pedidos.findIndex(pedido => pedido.id === id)
    if (index < 0) {
        return response.status(404).json({ error: 'pedido Not Found' })
    }
    request.pedidoIndex = index
    request.pedidoId = id
    next()
}

app.get('/pedido', (request, response) => {

    return response.json(pedidos)

})
app.post('/pedido', (request, response) => {
    const { Name, Burguer, drink } = request.body

    const pedido = { id: uuid.v4(), Name, Burguer, drink }
    pedidos.push(pedido)
    return response.status(201).json(pedido)
})

app.put('/pedido/:id', checkPedidoId, (request, response) => {

    const { Name, Burguer, drink } = request.body
    const index = request.pedidoIndex
    const id = request.pedidoId
    const upPedido = { id, Name, Burguer, drink }
    users[index] = upPedido

    return response.json(upPedido)

})

app.delete('/pedido/:id', checkPedidoId, (request, response) => {

    const index = request.pedidoIndex

    pedidos.splice(index, 1)



    return response.status(204).json()

})











app.listen(3005, () => {
    console.log(`✨Server Start on Port ${port}`)

})