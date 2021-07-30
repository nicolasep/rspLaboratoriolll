window.addEventListener("load",()=>{

    let main = new Main();
   //main.ListaInicial();

    let btnAgregar = Main.$("btnAgregar");
    btnAgregar.addEventListener("click",main);

    let btnCancelar = Main.$("btnCancelar");
    btnCancelar.addEventListener("click",main);

    let btnGuardar = Main.$("btnGuardar");
    btnGuardar.addEventListener("click",main);

    let checkId = Main.$("mostrarId");
    checkId.addEventListener("change",main);

    let checkNombre = Main.$("mostrarNombre");
    checkNombre.addEventListener("change",main);

    let checkApellidpo = Main.$("mostrarApellido");
    checkApellidpo.addEventListener("change",main);

    let checkEdad = Main.$("mostrarEdad");
    checkEdad.addEventListener("change",main);

    let selecTipo = Main.$("gSelect");
    selecTipo.addEventListener("change",main);

    
    let selecVista = Main.$("selectTipo");
    selecVista.addEventListener("change",main);

    let promedio = Main.$("btnPromedio");
    promedio.addEventListener("click",main);

});

class Main implements EventListenerObject
{
    private listaVh:Array<Cliente>;

    public constructor()
    {
        this.listaVh = new Array<Cliente>();
    }
    handleEvent(evt: Event): void 
    {
        let evento = evt.target;
        
        switch((<HTMLInputElement>evento).id)
        {
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
    }
    
    public static $(id:string):HTMLElement
    {
        return <HTMLElement>document.getElementById(id);
    }
    public AbrirGrilla():void
    {
        let grilla = Main.$("contGrilla");
        grilla.style.display = "block";
    }
    public CerrarGrilla():void
    {
        let grilla = Main.$("contGrilla");
        grilla.style.display = "none";
    }
    public MostrarPorTipo():void/////////////////
    {
        let tipo = <HTMLInputElement>Main.$("selectTipo");
        console.log(tipo.value);
        (<HTMLInputElement>Main.$("promedio")).value = "";
        if(tipo.value == "femenino")
        {
            let aux = this.listaVh.filter(item => item.sexo===1);//corregir
            this.ModificarColumnas(aux);
        }
        else if(tipo.value == "masculino")
        {
            let aux = this.listaVh.filter(item => item.sexo===2);
            this.ModificarColumnas(aux);
        }
        else
        {
            this.ModificarColumnas();
        }
    }
    public ModificarColumnas(lista?:Array<Cliente>):void
    {
        let cuerpo =<HTMLInputElement> Main.$("tCuerpo");
        let cabecera = <HTMLInputElement> Main.$("tCabecera");
        while(cabecera.hasChildNodes())
        {
            cabecera.removeChild(<Node>cabecera.lastChild);
        }
        while(cuerpo.hasChildNodes())
        {
            cuerpo.removeChild(<Node>cuerpo.lastChild);
        }
        if(lista == null)
        {
            this.listaVh.forEach(element => {
                this.CargarEnLista(element);
            });
        }
        else
        {
            lista.forEach(element => {
                this.CargarEnLista(element);
            });
        }
        
    }
    
    public RecuperarUltimoId():number
    {
        if(this.listaVh.length > 0)
        {
            let retorno = this.listaVh.reduce((idMax,item)=>{
                if(item.id > idMax)
                {
                    return item.id;
                }
                else
                {
                    return idMax;
                }
            },0);
            retorno++;
            return retorno;
        }
        return 1;
        
    }
    public Guardar():void
    {
        let nombre =<HTMLInputElement> Main.$("gNombre");
        let apellido = <HTMLInputElement>Main.$("gApellido");
        let edad = <HTMLInputElement>Main.$("gEdad");
        let sexo = <HTMLInputElement>Main.$("gSelect");
        let ingresoDatos = 0;

        if(nombre.value == "")
        {
            nombre.className = "inputGrilla error";
        }
        else
        {
            nombre.className = "inputGrilla sinError";
            ingresoDatos ++;
        }

        if(apellido.value == "")
        {
            apellido.className = "inputGrilla error";
        }
        else
        {
            apellido.className = "inputGrilla sinError";
            ingresoDatos ++;
        }
        if(edad.value == "")
        {
            edad.className = "inputGrilla error";
            
        }
        else
        {
            edad.className = "inputGrilla sinError";
            ingresoDatos++;
        }

        if(sexo.value != "todos" && ingresoDatos == 3)
        {
            if(sexo.value == "femenino")
            {
                
                
                let aux = new Cliente(this.RecuperarUltimoId(),nombre.value,apellido.value,parseInt(edad.value),Sexo.FEMENINO);
                this.listaVh.push(aux);
                //cargar en la lista
                this.CargarEnLista(aux);
                this.CerrarGrilla();
               
            }
            else if(sexo.value == "masculino")
            {
                let aux = new Cliente(this.RecuperarUltimoId(),nombre.value,apellido.value,parseInt(edad.value),Sexo.MASCULINO);
                this.listaVh.push(aux);
                this.CargarEnLista(aux);

                this.CerrarGrilla();
                //cargar en la lista
            }
        }
        else
        {
            alert("Falta llenar algun campo");
        }
        
        
    }
    public CargarEnLista(vh:Cliente):void
    {
        let tCuerpo = Main.$("tCuerpo");
        let tCabecera = Main.$("tCabecera");
        let trH = document.createElement("tr");
        let tr = document.createElement("tr");

        let seleccionoAlgo = 0;
        if((<HTMLInputElement>Main.$("mostrarId")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
                let th = document.createElement("th");
                trH.appendChild(th);
                let nodoH = document.createTextNode("Id");
                th.appendChild(nodoH);
            }

            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.id.toString());
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarNombre")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Nombre");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.nombre);
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarApellido")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Apellido");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.apellido);
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }

        if((<HTMLInputElement>Main.$("mostrarEdad")).checked)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Edad");
            th.appendChild(nodoH);
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.edad.toString());
            td.appendChild(nodo);
            seleccionoAlgo=1;
        }
        if(seleccionoAlgo)
        {
            if(tCabecera.childElementCount == 0)
            {
            let th = document.createElement("th");
            trH.appendChild(th);
            let nodoH = document.createTextNode("Sexo");
            th.appendChild(nodoH);
            }

            let td = document.createElement("td");
            tr.appendChild(td);
            let nodo = document.createTextNode(vh.Sexo);
            td.appendChild(nodo);
            tr.addEventListener("click",this.AbrirGrilla);
        }
        
        tCabecera.appendChild(trH);
        tCuerpo.appendChild(tr);
    }
    public EliminarId(id:number):boolean
    {
        
        for(let i=0;i<this.listaVh.length;i++)
        {
            if((<Cliente>this.listaVh[i]).id == id)
            {
                this.listaVh.splice(i,1);
                return true;
            }
        }
        
        return false;
    }
    public Eliminar(ev:Event):void
    {
        let elemento = <HTMLElement>ev.target;
        let tcuerpo = Main.$("tCuerpo");

        let id = <string>elemento.parentElement?.parentNode?.childNodes.item(0).textContent;
        let nombre = <string>elemento.parentElement?.parentNode?.childNodes.item(1).textContent;
        let apellido = <string>elemento.parentElement?.parentNode?.childNodes.item(2).textContent;
        let edad = <string>elemento.parentElement?.parentNode?.childNodes.item(3).textContent;
        let sexo = <string>elemento.parentElement?.parentNode?.childNodes.item(4).textContent;


        (<HTMLInputElement>Main.$("gId")).value = id;
        (<HTMLInputElement>Main.$("gNombre")).value = nombre;
        (<HTMLInputElement>Main.$("gApellido")).value = apellido;
        (<HTMLInputElement>Main.$("gEdad")).value = edad;
        (<HTMLInputElement>Main.$("gSexo")).value = sexo;
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
    }
    public CalcularPromedio():void
    {
        let seleccion = (<HTMLInputElement>Main.$("selectTipo")).value;

        let promedio:number;
        let contador = 0;
        let resultado;

        if(seleccion == "femenino")
        {
            promedio = this.listaVh.filter(item => item.sexo==1).reduce((total,item)=>{
                contador++;
                return total += item.edad;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else if(seleccion == "masculino")
        {
            promedio = this.listaVh.filter(item => item.sexo==2).reduce((total,item)=>{
                contador++;
                return total += item.edad;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
        else
        {
            promedio = this.listaVh.reduce((total,item)=>{
                contador++;
                return total += item.edad;
                
            },0);
            resultado = promedio/contador;
            (<HTMLInputElement>Main.$("promedio")).value = resultado.toString();
        }
    }
    /*
    public ListaInicial():void
    {

        if(this.listaVh.length == 0 )
        {
            let au1 = new Auto(this.RecuperarUltimoId(),"Ford","Mondeo",502120,4);
            
            this.listaVh.push(au1);

            let au2 = new Auto(this.RecuperarUltimoId(),"Fiat","Palio",305224,5);
            
            this.listaVh.push(au2);

            let au3 = new Auto(this.RecuperarUltimoId(),"Fiat","Siena",402120,4);
            
            this.listaVh.push(au3);

            let au4 = new Auto(this.RecuperarUltimoId(),"Vw","Fox",705822,3);
            
            this.listaVh.push(au4);

            let ca1 = new Camioneta(this.RecuperarUltimoId(),"Vw","Amarok",805562,true);
            
            this.listaVh.push(ca1);

            let ca2 = new Camioneta(this.RecuperarUltimoId(),"Ford","Ranger",1205562,false);
            
            this.listaVh.push(ca2);

            let ca3 = new Camioneta(this.RecuperarUltimoId(),"Rover","Range",2105562,true);
            
            this.listaVh.push(ca3);
            
            let ca4 = new Camioneta(this.RecuperarUltimoId(),"Doogge","Ram",2505562,true);
            
            this.listaVh.push(ca4);
            
        }
        this.ModificarColumnas();
    }*/
}