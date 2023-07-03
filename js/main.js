let stockProductos = [
    {id: 1, nombre:"Tortas en Crema, 3 rell. budín", cantidad: 1, precio: 2500, categoria: "Tortas en crema", desc:"Tortas en Crema, 3 rellenos, biscochuelo budín", img: "./media/img/TortasEnCrema3RellenosBudín.png"},
    {id: 2, nombre:"Tortas en Crema, 2 rell. budín", cantidad: 1, precio: 2300, categoria: "Tortas en crema", desc:"Tortas en Crema, 2 rellenos, biscochuelo budín", img: "./media/img/TortasEnCrema3RellenosBudín.png",},
    {id: 3, nombre:"Tortas en Crema, 3 rell. clásico", cantidad: 1, precio: 2400, categoria: "Tortas en crema", desc:"Tortas en Crema, 3 rellenos, biscochuelo clásico", img: "./media/img/TortasEnCrema3RellenosClasico.jpg",},
    {id: 4, nombre:"Tortas en Crema, 2 rell. clásico", cantidad: 1, precio: 2200, categoria: "Tortas en crema",desc:"Tortas en Crema, 2 rellenos, biscochuelo clásico", img: "./media/img/TortasEnCrema3RellenosClasico.jpg",},
    {id: 5, nombre:"Tortas Forradas 2 kilos", cantidad: 1, precio: 3000, categoria: "Tortas forradas",desc:"Torta forrada de 2 kilos, 3 rellenos, biscochuelo clásico", img: "./media/img/tortaforrada.png",},
    {id: 6, nombre:"Tortas Forradas 5 kilos", cantidad: 1, precio: 17500, categoria: "Tortas forradas",desc:"Torta forrada de 5 kilos, 3 rellenos, biscochuelo clásico", img: "./media/img/tortaforrada.png",},
    {id: 8, nombre:"Tarta de gelatina", cantidad: 1, precio: 2000, categoria: "Tartas dulces",desc:"Tartas dulce con gelatina y merengue o crema", img:"./media/img/TartaDeGelatina.jpg"},
    {id: 10, nombre:"Tarta de frutas", cantidad: 1, precio: 2500, categoria: "Tartas dulces", desc:"Tartas dulce con frutas y merengue o crema",img:"./media/img/TartaDeFruta.jpg"},
    {id: 11, nombre:"Docena de Alfajores de Maizena tamaño M", cantidad: 1, precio: 1000, categoria:"Alfajores", desc: "Alfojeres de Maizena.", img:"./media/img/AlfajoresDeMaizena.jpg"},
    {id: 12, nombre:"Docena de Alfajores de Maizena tamaño XL", cantidad: 1, precio: 2000, categoria:"Alfajores", desc: "Alfojeres de Maizena.",img:"./media/img/AlfajoresDeMaizenaXL.png"},
    {id: 13, nombre: "Desayunos opción 1" , cantidad: 1, precio: 3500, categoria:"Desayunos", desc:"Desayunos económicos, para ocaciones especiales", img:"./media/img/DesayunoOpcion1.jpg"},
    {id: 14, nombre: "Desayunos opción 2" , cantidad: 1, precio: 4000, categoria:"Desayunos", desc:"Desayunos premium con dedicatorias, para ocaciones especiales" , img:"./media/img/DesayunoOpcion2.jpg"},
]



const contenedorProductos = document.getElementById('contenedor-productos')



const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const botonConfirmar = document.getElementById('confirmar-compra')


const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

botonConfirmar.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Compra exitosa',
        text: 'Puedes seguir comprando',
      })
})




stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} >
    <h4>${producto.nombre}</h4>
    <p>${producto.categoria}</p>
    <p>Descripción: ${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)       
    })

    boton.addEventListener('click', () => {

        Toastify({
            text: "Producto agregado",
            duration: 3000,
            
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "royalblue",
            },
            
          }).showToast();
    })

})


const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
       
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    contenedorCarrito.innerHTML = "" 
    
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    

}

//Búsqueda
search.addEventListener("input", () => {
    let busqueda = filtrar(producto, search.value, "nombre");
    crearHtml(busqueda);
  });