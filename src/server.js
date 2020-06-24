const express = require("express")
const server = express()

// configurar pasta public
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {express: server, noCache:true})

// configurar caminhos da minha aplicações
// página inicial
server.get("/", (req, res) => {
    res.render("index.html")
})

server.get("/create-point", (req, res) => {
    res.render("create-point.html")
})

server.get("/search", (req, res) => {
    res.render("search-result.html")
})

//ligar o servidor
server.listen(3000)

