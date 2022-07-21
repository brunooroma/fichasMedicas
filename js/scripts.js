let cuerpo = document.getElementById('cuerpo');
let botonModo = document.getElementById('botonModo');
let iconoModo = document.getElementById('iconoModo');
let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
let mostrarTodosLosPacientes = document.getElementById('mostrarTodosLosPacientes');
let divFechaActual = document.getElementById('fecha');
const divTurno = document.getElementById('divTurno');
let tarjeta = document.createElement('div');
let botonSeleccionar = document.createElement('button');
let botonBorrar = document.createElement('button');
let mostrarTurno = document.createElement('h4');
let inputFiltrarMedico = document.getElementById('inputFiltrarMedico');
let inputFiltrarPaciente = document.getElementById('inputFiltrarPaciente');
let registroPaciente = document.getElementById('registrarPaciente');
let botonFecha = document.getElementById('confirmarFecha');
let hoy = moment().format('YYYY-MM-DD');
let confirmarTurno = document.getElementById('confirmarTurno');
let inputs = document.querySelectorAll('#formulario input');
let divMedicos = document.getElementById('divMedicos');
let divPacientes = document.getElementById('divPacientes');
let divFecha = document.getElementById('divFecha');

let contadorPaciente = 0; 
let plantelMedico = '';
let turnoMedico = '';
let turnoPaciente = '';
let campoFecha = false;
let turnoFecha = '';
let contadorTurno;

//FUNCION MODO OSCURO
botonModo.addEventListener('click', function () {
    cuerpo.classList.toggle('modoOscuro');
    if(cuerpo.classList.contains('modoOscuro')){
        botonModo.innerHTML = `
        <i class="fa-solid fa-sun fa-xl"></i>
        `
        divMedicos.classList.add('formatoDivsModoOscuro')
        divPacientes.classList.add('formatoDivsModoOscuro')
        divFecha.classList.add('formatoDivsModoOscuro')
    }else{
        botonModo.innerHTML = `
        <i class="fa-regular fa-moon fa-xl"></i>
        `
        divMedicos.classList.remove('formatoDivsModoOscuro')
        divPacientes.classList.remove('formatoDivsModoOscuro')
        divFecha.classList.remove('formatoDivsModoOscuro')
        divMedicos.classList.add('formatoDivs')
        divPacientes.classList.add('formatoDivs')
        divFecha.classList.add('formatoDivs')            
    };
})

//FUNCION RELOJ
const mueveReloj = () => {
    let momentoActual = new Date();
    let hora = momentoActual.getHours();
    let minuto = momentoActual.getMinutes();
    let segundo = momentoActual.getSeconds();
    hora < 10 ? hora = '0' + hora : hora;
    minuto < 10 ? minuto = '0' + minuto : minuto;
    segundo < 10 ? segundo = '0' + segundo : segundo;

    let fechaActual = moment().format('DD-MM-YYYY');
    let horaActual = `${hora}:${minuto}:${segundo}`;
    divFechaActual.innerText = `${fechaActual} ${horaActual}`;
}
setInterval('mueveReloj()',1000);

//GUARDAR LOCALSTORAGE
const guardarLocalStorage = () => {
    localStorage.setItem('Pacientes',JSON.stringify(arrPacientes))
}

//CARGAR LOCALSTORAGE
const cargarLocalStorage = () => {
    arrPacientes = JSON.parse(localStorage.getItem('Pacientes')) || arrPacientes
}

//CREAR TARJETAS
const crearTarjeta = (apellido,nombre,otro,contenedor) => {
    tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');
    tarjeta.innerHTML = `
    <h4>${apellido} ${nombre}</h4>
    <img src="./img/perfil.png">
    <p>${otro}</p>`;
    crearBotonBorrar();
    crearBotonSeleccionar();
    contenedor.appendChild(tarjeta)
}

//CREAR BOTON SELECCIONAR
const crearBotonSeleccionar = () => {
    botonSeleccionar = document.createElement('button');
    botonSeleccionar.innerHTML = 'Seleccionar';
    botonSeleccionar.classList.add('boton');
    tarjeta.append(botonSeleccionar);
}

//CREAR BOTON BORRAR
const crearBotonBorrar = () => {
    botonBorrar = document.createElement('button');
    botonBorrar.innerHTML = 'X';
    botonBorrar.classList.add('botonBorrar');
    tarjeta.prepend(botonBorrar);
}

//SIN TURNO
const sinTurno = () => {
    if(turnoMedico == '' && turnoPaciente == '') {
    mostrarTurno.innerHTML = 'No selecciono un turno';
    divTurno.prepend(mostrarTurno);
    }
}

//MOSTRAR MEDICOS
const mostrarMedicos = async () => {
    let response = await fetch('data.json')
    let data = await response.json()
    plantelMedico = data;

    plantelMedico.forEach((medico) => {
        crearTarjeta(medico.apellidoMedico,medico.nombreMedico,medico.especialidadMedico,mostrarTodosLosMedicos);

        botonSeleccionar.addEventListener('click',function () {
            seleccionarMedico(medico);
        },false);
    })
}

//BOTON SELECCIONAR MEDICO
const seleccionarMedico = (a) => {
    turnoMedico = `${a.apellidoMedico} ${a.nombreMedico}`;
    console.log(turnoMedico)

    if(contadorPaciente === 0){
        swal.fire('Seleccione un paciente');
    }else{
        swal.fire('Seleccione nuevamente el paciente');
    };
    divTurno.innerHTML = ``;
    if (turnoPaciente != ''){
        turnoPaciente = '';
    }
    visualizarTurno();

}

//FILTRAR TARJETAS MEDICOS
const filtrarMedicos = () => {
    mostrarTodosLosMedicos.innerHTML = ``;
    let medicosFiltrados = plantelMedico.filter((medico) => {
    return medico.apellidoMedico.includes(inputFiltrarMedico.value)});
    if(inputFiltrarMedico.value !== ''){
        medicosFiltrados.forEach((medico) => {
        let {apellidoMedico: apellido,
            nombreMedico: nombre,
            especialidadMedico: especialidad} = medico;
        crearTarjeta(apellido,nombre,especialidad,mostrarTodosLosMedicos);

        botonSeleccionar.addEventListener('click',function () {
            seleccionarMedico(medico);
        },false);
        })
    }else{
        mostrarMedicos();
    }
}

//BUSCAR MEDICOS EN INPUT
inputFiltrarMedico.addEventListener('input',filtrarMedicos);

//MOSTRAR PACIENTES
const mostrarPacientes = () => {
    mostrarTodosLosPacientes.innerHTML = '';
    for (const paciente of arrPacientes) {
        let {apellidoPaciente: apellido,
            nombrePaciente: nombre,
            emailPaciente: email} = paciente;
        crearTarjeta(apellido,nombre,email,mostrarTodosLosPacientes);

        botonSeleccionar.addEventListener('click',function () {
            seleccionarPaciente(paciente);
        },false);
    }
}

//BOTON SELECCIONAR PACIENTE
const seleccionarPaciente = (a) => {
    turnoPaciente = `${a.apellidoPaciente} ${a.nombrePaciente}`;
    if(turnoMedico === ''){
        swal.fire('Seleccione un medico');
    }else{
        swal.fire('Por favor seleccione una fecha');
    }
    divTurno.innerHTML = ``;
    visualizarTurno();
    contadorPaciente++;
}

//FILTRAR PACIENTES
const filtrarPacientes = () => {
    mostrarTodosLosPacientes.innerHTML = ``
    let pacientesFiltrados = arrPacientes.filter((paciente) => {
    return paciente.apellidoPaciente.includes(inputFiltrarPaciente.value)});

    if(inputFiltrarPaciente.value !== ''){
        pacientesFiltrados.forEach((paciente) => {
        let {apellidoPaciente: apellido,
            nombrePaciente: nombre,
            emailPaciente: email} = paciente;
        crearTarjeta(apellido,nombre,email,mostrarTodosLosPacientes);

        botonSeleccionar.addEventListener('click',function () {
            seleccionarPaciente(paciente);
        },false);
        })
    }else{
        mostrarPacientes();
    }
}

//BUSCAR PACIENTES EN INPUT
inputFiltrarPaciente.addEventListener('input',filtrarPacientes);

//REGISTRAR NUEVO PACIENTE
const registrarPaciente = () => {
    let nombrePacienteRegistro = document.getElementById('nombre');
    let apellidoPacienteRegistro = document.getElementById('apellido');
    let edadPacienteRegistro = document.getElementById('edad');
    let emailPacienteRegistro = document.getElementById('email');
    let formularioRegistro =  document.getElementById('formulario');

    const pacienteRegistro = new Paciente((arrPacientes.length+1),apellidoPacienteRegistro.value,nombrePacienteRegistro.value,edadPacienteRegistro.value,emailPacienteRegistro.value);

    if(apellidoPacienteRegistro.value == '' || nombrePacienteRegistro.value == '' || emailPacienteRegistro.value == ''){
        swal.fire(
            'Datos Incompletos',
            'Por favor complete todos los datos del paciente',
            'warning');
    }else if(camposFormulario.nombre && camposFormulario.apellido && camposFormulario.edad &&   camposFormulario.email) {
        arrPacientes.push(pacienteRegistro);
        guardarLocalStorage();
        formularioRegistro.reset();
        cargarLocalStorage();
        mostrarTodosLosPacientes.innerHTML = '';
        mostrarPacientes();
        nombrePacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        apellidoPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        edadPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto'); 
        emailPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        swal.fire('Paciente registrado exitosamente');
    }else{
        swal.fire('Uno o mas campos son incorrectos');
    }
}

//BOTON REGISTRAR PACIENTE
registroPaciente.onclick = (e) => {
    e.preventDefault();
    registrarPaciente();
}

//VALIDACION DE CAMPOS DEL FORMULARIO DE REGISTRO
const validarFormulario = (e) => {
    switch(e.target.name){
    case "nombre":
            validarCampo(expresiones.texto, e.target, e.target.name)
        break;
    case "apellido":
            validarCampo(expresiones.texto, e.target, e.target.name);
        break;
    case 'edad':
        validarCampo(expresiones.edad, e.target, e.target.name);
        break;
    case 'email':
        validarCampo(expresiones.correo, e.target, e.target.name);
        break;
    }
}

//PARA QUE NO SE ENVIE EL FORMULARIO
const camposFormulario =  {
    nombre: false,
    apellido: false,
    edad: false,
    email: false
}

//EXPRESIONES REGULARES PARA COMPARAR
const expresiones = {
	texto: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
	edad: /^[0-9]{1,3}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

//ESTRUCTURA DE LA VALIDACION
const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.querySelector(`#${campo}`).classList.add('valorCorrecto');
        document.querySelector(`#${campo}`).classList.remove('valorIncorrecto');
        camposFormulario[campo] = true;
    }else{
        document.querySelector(`#${campo}`).classList.add('valorIncorrecto');
        document.querySelector(`#${campo}`).classList.remove('valorCorrecto');
        camposFormulario[campo] = false;
    }
}

//EJECUCION DE LA VALIDACION
inputs.forEach((input) => {
    input.addEventListener('input',validarFormulario);
    input.addEventListener('blur',validarFormulario);
})

//VALIDACION INPUT FECHA
const validarFecha = () => {
    turnoFecha = document.getElementById('fechaTurno').value;
    if(turnoMedico === '' && turnoPaciente === ''){
        swal.fire('Seleccione un medico y un paciente');
    }else if(turnoMedico === ''){
        swal.fire('Seleccione un medico');
    }else if(turnoPaciente === '') {
        swal.fire('Seleccione un paciente');
    }else if (turnoFecha === ''){
        swal.fire('Seleccione una fecha');
    }else if(turnoFecha < hoy){
        swal.fire('La fecha no puede ser anterior al dia de hoy');
    }else{
        swal.fire(`La fecha seleccionada es: ${turnoFecha}`)
        campoFecha = true;
    }
    divTurno.innerHTML = ``;
    visualizarTurno();
}

//BOTON CONFIRMAR FECHA
botonFecha.addEventListener('click',validarFecha);

//VISUALIZAR TURNO
const visualizarTurno = () => {
    mostrarTurno.remove();
    let verTurno = document.createElement('div')
    verTurno.innerHTML += `
    <p>Profesional: ${turnoMedico}</p>
    <p>Paciente: ${turnoPaciente}</p>
    <p>Fecha: ${turnoFecha}</p>
    `;
    divTurno.append(verTurno);
    if(turnoMedico !== '' && turnoPaciente !== '' && turnoFecha !== '' && campoFecha){
        confirmarTurno.classList.remove('oculto');
    }
}

//CONTADOR TURNO
const traerContadorTurno = () => {
    if(localStorage.getItem('ContadorTurno')){
        contadorTurno = JSON.parse(localStorage.getItem('ContadorTurno'));
    }else{
        contadorTurno = 1;
    }
}

//CONFIRMAR TURNO
const confirmacionTurno = () => {
    let turno = [turnoMedico,turnoPaciente,turnoFecha];
    traerContadorTurno();
    localStorage.setItem(`Turno${contadorTurno}`,JSON.stringify(turno));
    turnoMedico = turnoPaciente = turnoFecha = '';
    divTurno.innerHTML = ``;
    sinTurno();
    confirmarTurno.classList.add('oculto');
    contadorTurno++;
    localStorage.setItem('ContadorTurno',JSON.stringify(contadorTurno));
    swal.fire('El turno fue agendado');
    contadorPaciente = 0;
}

//BOTON CONFIRMAR TURNO
confirmarTurno.addEventListener('click',confirmacionTurno);

sinTurno();
cargarLocalStorage();
mostrarMedicos();
mostrarPacientes();