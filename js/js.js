/*variables*/
var rowId = 0
var catBreeds = {}
/*Manejo y edicion del DOM*/
/*obtienes elementos del HTML por su id definido*/
/*Manejo de eventos como .onclick*/

/*
*Creando Eventos a los botones guardar y eliminar
*/
//Mejorando el boton Guardar y Formulario
document.getElementById("petsave-button").onclick = function savePet() {
	rowId += 1
	//Objetos json
	let info = {
		dateBirth: document.getElementById("date-input").value,
		nameOwner: document.getElementById("owner-input").value,
		namePet: document.getElementById("petname-input").value,
		//+ convierte de str a int
		agePet: +document.getElementById("petage-input").value,
		speciePet: document.getElementById("petspecies-input").value,
		sizePet: document.getElementById("petsize-input").value
	}
	//Creacion de elementos para HTML
	let tr = document.createElement("tr")
	//Atributos de los elementos creados
	tr.setAttribute("id", "row-" + rowId)
	let tdId = document.createElement("td")
	//Modificacion de texto de los elementos
	tdId.innerHTML = rowId
	//Se le agrega al elemento creado tr el otro elemento creado td
	tr.appendChild(tdId)

	//Creacion de iterador sobre un 'arreglo'
	Object.keys(info).forEach((key) => {
		let td = document.createElement("td")
		td.innerHTML = info[key]
		tr.appendChild(td)
	})

	let tdActions = document.createElement("td")
	let deleteButton = document.createElement("input")
	deleteButton.setAttribute("type", "button")
	deleteButton.setAttribute("id", "delete-" + rowId)
	deleteButton.setAttribute("class", "btn btn-danger")
	deleteButton.value = "Eliminar"
	deleteButton.onclick = function(){
		//Obtiene el atributo del objeto deleteButton
		let id = this.getAttribute("id")
		//Remplaza el atrubuto del id
		id = +id.replace("delete-", "")
		//Elimina el elemento que tengan el id que se llamo
		document.getElementById("row-" + id).remove()
	}
	tdActions.appendChild(deleteButton)
	let input2 = document.createElement("input")
	input2.setAttribute("type", "button")
	input2.setAttribute("class", "btn btn-warning")
	input2.value = "Editar"
	tdActions.appendChild(input2)
	tr.appendChild(tdActions)

	document.getElementById("body-table").appendChild(tr) 
};

/*
*DOG API
*/
//Al no estar dentro de una funcion o evento este codigo se ejecuta al cargar la pagina
fetch("https://dog.ceo/api/breeds/list/all")
	.then(response => response.json())
	.then(data => {
		let dogBreed = document.getElementById("dogBreed")
		Object.keys(data.message).map((breed) =>{
			let option = document.createElement("option")
			option.innerHTML = breed
			dogBreed.appendChild(option)
		})
	})

//Modificando las imagenes de las mascotas boton mostrar Imagen
document.getElementById("show-dogimage").onclick = function(){

	let breedSelected = document.getElementById("dogBreed").value
	//Documentacion del sitio web MDN Web Docs
		//llama a la API creando una promise
	fetch('https://dog.ceo/api/breed/'+ breedSelected +'/images/random')
		//Indica que se debe hacer al terminar el llamado de la API, en este caso convertilo a un json
		.then(response => response.json())
		//Indica que hacer al recibir datos del seridor en este caso imprimir lo obtenido en consola
		//Acceder a los datos del API obtenido, en este caso se hace por medio del data.keyDelJSON
		.then(data =>{
			let img = document.getElementById("dog-image").setAttribute("src", data.message)
		});
}

/*
*CAT API
*/
//Obtiene razas de gatos de la API
fetch("https://api.thecatapi.com/v1/breeds")
	.then(responsive => responsive.json())
	.then(data => {
		catBreeds = data
		let catBreed = document.getElementById("catBreed")
		data.map((breed) => {
			let option = document.createElement("option")
			option.innerHTML = breed.name
			catBreed.appendChild(option)
		})
	})

document.getElementById("show-catimage").onclick = function(){
	let breedSelected = document.getElementById("catBreed").value

	let catID = catBreeds.find(breed => breedSelected == breed.name).id
	fetch("https://api.thecatapi.com/v1/images/search?breed_ids=" + catID)
		.then(response => response.json())
		.then(data =>{
			let img = document.getElementById("cat-image").setAttribute("src", data[0].url)
		});
}

/*
 *Experimetando con cookies, storage adn IndexedDB
 */

 document.getElementById("dogBreed").onchange = function (){
 	let dogBreed = document.getElementById("dogBreed")
 	console.log(dogBreed)
 	document.cookie = "Raza del perro seleccionada = " + dogBreed
 }