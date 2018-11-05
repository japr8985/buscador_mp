$(document).ready( () => {
	// habilitar la visualizacion de los selects
	$('select').material_select();
	/**
	 *	Crea tarjeta por cada elemento
	 */
	function createCard(obj) {
		let html = "<div class='col s12 m4'>"
		html += "<div class='card blue-grey darken-1' id='" + obj.Id + "''>"
		html += "<div class='card-content white-text'>"
		html += "<span class='card-title'>"
		html += obj.Tipo
		html += "</span>"
		html += "</div>"
		html += "<div class='card-content'>"
		html += "<p>" + obj.Ciudad + "/" + obj.Direccion
		html += "</div>"
		html += "<div class='card-action'>"
		html += "<a href='#'>"
		html += obj.Precio
		html += "</a>"
		html += "<a href='#'>"
		html += obj.Telefono
		html += "</a>"
		html += "</div>"
		html += "</div>"
		html += "</div>"
		return html
	}
	// cuando se le haga click al boton del buscador
	$("#submitButton").click(e => {
		/**
		 * previene su accion por defecto
		 * */ 
		e.preventDefault()
		/**
		 * limpiando los resultados de la busqueda anterior
		 */
		// seleccciona el elemento content
		let content = document.getElementById("content")
		// mientras content tenga un hijo
		while (content.firstChild) {
			// elimina el el primer hijo dentro de contenido
			content.removeChild(content.firstChild)
		}
		const filters = {
			city: $("#selectCiudad option:selected").val(),
			type: $("#selectTipo option:selected").val(),
			price: $("#rangoPrecio").val()
		}
		// realiza un llamado al archivo buscador.php
		fetch('buscador.php', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(filters)
		}).then(response => {
			// transforma la respuesta un objeto json
			return response.json()
		}).then(response => {
			// visualizar los resultados de la busqueda
			for (let i in response) {
				const card = createCard(response[i])
				$("#content").append(card)
			}
		}).catch(error => {
			// manejar errores en caso de que existan
			console.log(error)
		})
	})
	// mostrar todos 
	$("#mostrarTodos").click(e => {
		e.preventDefault()
		/**
		 * limpiando los resultados de la busqueda anterior
		 */
		// seleccciona el elemento content
		let content = document.getElementById("content")
		// mientras content tenga un hijo
		while (content.firstChild) {
			// elimina el el primer hijo dentro de contenido
			content.removeChild(content.firstChild)
		}
		// realiza un llamado al archivo buscador.php
		// para mostrar todos los datos no se envian filtros
		// por eso body: JSON.stringify({})
		fetch('buscador.php', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		}).then(response => {
			// transforma la respuesta un objeto json
			return response.json()
		}).then(response => {
			// visualizar los resultados de la busqueda
			for (let i in response) {
				const card = createCard(response[i])
				$("#content").append(card)
			}
		}).catch(error => {
			// manejar errores en caso de que existan
			console.log(error)
		})
	})

})