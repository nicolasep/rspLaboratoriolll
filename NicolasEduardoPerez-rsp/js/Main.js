"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    //main.ListaInicial();
    var btnAgregar = Main.$("btnAgregar");
    btnAgregar.addEventListener("click", main);
    var btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click", main);
    var btnGuardar = Main.$("btnGuardar");
    btnGuardar.addEventListener("click", main);
    var checkId = Main.$("mostrarId");
    checkId.addEventListener("change", main);
    var checkNombre = Main.$("mostrarNombre");
    checkNombre.addEventListener("change", main);
    var checkApellidpo = Main.$("mostrarApellido");
    checkApellidpo.addEventListener("change", main);
    var checkEdad = Main.$("mostrarEdad");
    checkEdad.addEventListener("change", main);
    var selecTipo = Main.$("gSelect");
    selecTipo.addEventListener("change", main);
    var selecVista = Main.$("selectTipo");
    selecVista.addEventListener("change", main);
    var promedio = Main.$("btnPromedio");
    promedio.addEventListener("click", main);
});
var Main = /** @class */ (function () {
    function Main() {
        this.listaVh = new Array();
    }
    Main.prototype.handleEvent = function (evt) {
        var evento = evt.target;
        switch (evento.id) {
            case "btnAgregar":
                this.AbrirGrilla();
                break;
            case "btnCancelar":
                this.CerrarGrilla();
                break;
            case "btnGuardar":
                this.Guardar();
                break;
            case "mostrarId":
            case "mostrarNombre":
            case "mostrarApellido":
            case "mostrarEdad":
                this.ModificarColumnas();
                break;
            case "gSelect":
                // this.MostrarTipos();
                break;
            case "btnEliminar":
                this.Eliminar(evt);
                break;
            case "selectTipo":
                this.MostrarPorTipo();
                break;
            case "btnPromedio":
                this.CalcularPromedio();
                break;
        }
    };
    Main.$ = function (id) {
        return document.getElementById(id);
    };
    Main.prototype.AbrirGrilla = function () {
        var grilla = Main.$("contGrilla");
        grilla.style.display = "block";
    };
    Main.prototype.CerrarGrilla = function () {
        var grilla = Main.$("contGrilla");
        grilla.style.display = "none";
    };
    Main.prototype.MostrarPorTipo = function () {
        var tipo = Main.$("selectTipo");
        console.log(tipo.value);
        Main.$("promedio").value = "";
        if (tipo.value == "femenino") {
            var aux = this.listaVh.filter(function (item) { return item.sexo === 1; }); //corregir
            this.ModificarColumnas(aux);
        }
        else if (tipo.value == "masculino") {
            var aux = this.listaVh.filter(function (item) { return item.sexo === 2; });
            this.ModificarColumnas(aux);
        }
        else {
            this.ModificarColumnas();
        }
    };
    Main.prototype.ModificarColumnas = function (lista) {
        var _this = this;
        var cuerpo = Main.$("tCuerpo");
        var cabecera = Main.$("tCabecera");
        while (cabecera.hasChildNodes()) {
            cabecera.removeChild(cabecera.lastChild);
        }
        while (cuerpo.hasChildNodes()) {
            cuerpo.removeChild(cuerpo.lastChild);
        }
        if (lista == null) {
            this.listaVh.forEach(function (element) {
                _this.CargarEnLista(element);
            });
        }
        else {
            lista.forEach(function (element) {
                _this.CargarEnLista(element);
            });
        }
    };
    Main.prototype.RecuperarUltimoId = function () {
        if (this.listaVh.length > 0) {
            var retorno = this.listaVh.reduce(function (idMax, item) {
                if (item.id > idMax) {
                    return item.id;
                }
                else {
                    return idMax;
                }
            }, 0);
            retorno++;
            return retorno;
        }
        return 1;
    };
    Main.prototype.Guardar = function () {
        var nombre = Main.$("gNombre");
        var apellido = Main.$("gApellido");
        var edad = Main.$("gEdad");
        var sexo = Main.$("gSelect");
        var ingresoDatos = 0;
        if (nombre.value == "") {
            nombre.className = "inputGrilla error";
        }
        else {
            nombre.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (apellido.value == "") {
            apellido.className = "inputGrilla error";
        }
        else {
            apellido.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (edad.value == "") {
            edad.className = "inputGrilla error";
        }
        else {
            edad.className = "inputGrilla sinError";
            ingresoDatos++;
        }
        if (sexo.value != "todos" && ingresoDatos == 3) {
            if (sexo.value == "femenino") {
                var aux = new Cliente(this.RecuperarUltimoId(), nombre.value, apellido.value, parseInt(edad.value), Sexo.FEMENINO);
                this.listaVh.push(aux);
                //cargar en la lista
                this.CargarEnLista(aux);
                this.CerrarGrilla();
            }
            else if (sexo.value == "masculino") {
                var aux = new Cliente(this.RecuperarUltimoId(), nombre.value, apellido.value, parseInt(edad.value), Sexo.MASCULINO);
                this.listaVh.push(aux);
                this.CargarEnLista(aux);
                this.CerrarGrilla();
                //cargar en la lista
            }
        }
        else {
            alert("Falta llenar algun campo");
        }
    };
    Main.prototype.CargarEnLista = function (vh) {
        var tCuerpo = Main.$("tCuerpo");
        var tCabecera = Main.$("tCabecera");
        var trH = document.createElement("tr");
        var tr = document.createElement("tr");
        var seleccionoAlgo = 0;
        if (Main.$("mostrarId").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Id");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.id.toString());
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarNombre").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Nombre");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.nombre);
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarApellido").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Apellido");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.apellido);
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (Main.$("mostrarEdad").checked) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Edad");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.edad.toString());
            td.appendChild(nodo);
            seleccionoAlgo = 1;
        }
        if (seleccionoAlgo) {
            if (tCabecera.childElementCount == 0) {
                var th = document.createElement("th");
                trH.appendChild(th);
                var nodoH = document.createTextNode("Sexo");
                th.appendChild(nodoH);
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            var nodo = document.createTextNode(vh.Sexo);
            td.appendChild(nodo);
            tr.addEventListener("click", this.AbrirGrilla);
        }
        tCabecera.appendChild(trH);
        tCuerpo.appendChild(tr);
    };
    Main.prototype.EliminarId = function (id) {
        for (var i = 0; i < this.listaVh.length; i++) {
            if (this.listaVh[i].id == id) {
                this.listaVh.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    Main.prototype.Eliminar = function (ev) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var elemento = ev.target;
        var tcuerpo = Main.$("tCuerpo");
        var id = (_b = (_a = elemento.parentElement) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.childNodes.item(0).textContent;
        var nombre = (_d = (_c = elemento.parentElement) === null || _c === void 0 ? void 0 : _c.parentNode) === null || _d === void 0 ? void 0 : _d.childNodes.item(1).textContent;
        var apellido = (_f = (_e = elemento.parentElement) === null || _e === void 0 ? void 0 : _e.parentNode) === null || _f === void 0 ? void 0 : _f.childNodes.item(2).textContent;
        var edad = (_h = (_g = elemento.parentElement) === null || _g === void 0 ? void 0 : _g.parentNode) === null || _h === void 0 ? void 0 : _h.childNodes.item(3).textContent;
        var sexo = (_k = (_j = elemento.parentElement) === null || _j === void 0 ? void 0 : _j.parentNode) === null || _k === void 0 ? void 0 : _k.childNodes.item(4).textContent;
        Main.$("gId").value = id;
        Main.$("gNombre").value = nombre;
        Main.$("gApellido").value = apellido;
        Main.$("gEdad").value = edad;
        Main.$("gSexo").value = sexo;
        /*
        if((<HTMLInputElement>Main.$("mostrarId")).checked)
        {
            let id = parseInt(<string>elemento.parentElement?.parentNode?.childNodes.item(0).textContent);
            
            if(this.EliminarId(id))
            {
                tcuerpo.removeChild(<Node>elemento.parentElement?.parentNode);
            }
        }
        else
        {
            alert("Debe seleccionar la casilla de ID para eliminar");
        }*/
    };
    Main.prototype.CalcularPromedio = function () {
        var seleccion = Main.$("selectTipo").value;
        var promedio;
        var contador = 0;
        var resultado;
        if (seleccion == "femenino") {
            promedio = this.listaVh.filter(function (item) { return item.sexo == 1; }).reduce(function (total, item) {
                contador++;
                return total += item.edad;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else if (seleccion == "masculino") {
            promedio = this.listaVh.filter(function (item) { return item.sexo == 2; }).reduce(function (total, item) {
                contador++;
                return total += item.edad;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
        else {
            promedio = this.listaVh.reduce(function (total, item) {
                contador++;
                return total += item.edad;
            }, 0);
            resultado = promedio / contador;
            Main.$("promedio").value = resultado.toString();
        }
    };
    return Main;
}());
