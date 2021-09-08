
var rowId = 0
document.getElementById("petsave-button").onclick = function savePet() {
	rowId += 1
	let info = {
		dateBirth: document.getElementById("date-input").value,
		nameOwner: document.getElementById("owner-input").value,
		namePet: document.getElementById("petname-input").value,
		/*+ convierte de str a int*/
		agePet: +document.getElementById("petage-input").value,
		speciePet: document.getElementById("petspecies-input").value,
		sizePet: document.getElementById("petsize-input").value
	}
	
	let tr = document.createElement("tr")
	tr.setAttribute("id", "row-" + rowId)
	let tdId = document.createElement("td")
	tdId.innerHTML = rowId
	tr.appendChild(tdId)

	Object.keys(info).forEach((key) => {
		let td = document.createElement("td")
		td.innerHTML = info[key]
		tr.appendChild(td)
	})

	let tdActions = document.createElement("td")
	let input1 = document.createElement("input")
	input1.setAttribute("type", "button")
	input1.setAttribute("id", "delete-" + rowId)
	input1.setAttribute("class", "btn btn-danger")
	input1.value = "Eliminar"
	input1.onclick = function(){
		let id = this.getAttribute("id")
		id = +id.replace("delete-", "")
		document.getElementById("row-" + id).remove()
	}
	tdActions.appendChild(input1)
	let input2 = document.createElement("input")
	input2.setAttribute("type", "button")
	input2.setAttribute("class", "btn btn-warning")
	input2.value = "Editar"
	tdActions.appendChild(input2)
	tr.appendChild(tdActions)

	document.getElementById("body-table").appendChild(tr) 
};