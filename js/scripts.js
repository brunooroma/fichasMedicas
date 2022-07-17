let cuerpo = document.getElementById('cuerpo');
let botonModo = document.getElementById('botonModo');

let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

let mostrarTodosLosPacientes = document.getElementById('mostrarTodosLosPacientes');
const divPacientes = document.getElementById('divPacientes');

let contadorModo = 1;

botonModo.addEventListener('click', function () {
    if(contadorModo % 2){
        cuerpo.classList.add('modoOscuro');
    }else{
        cuerpo.classList.remove('modoOscuro');
    }
    contadorModo++
})


let divFechaActual = document.getElementById('fecha');

function mueveReloj(){
    let momentoActual = new Date();
    let hora = momentoActual.getHours();
    let minuto = momentoActual.getMinutes();
    let segundo = momentoActual.getSeconds();
    hora < 10 ? hora = '0' + hora : hora;
    minuto < 10 ? minuto = '0' + minuto : minuto;
    segundo < 10 ? segundo = '0' + segundo : segundo;

    let fechaActual = moment().format('DD/MM/YYYY');
    let horaActual = `${hora}:${minuto}:${segundo}`;
    divFechaActual.innerText = `${fechaActual} ${horaActual}`;
}

setInterval('mueveReloj()',1000);

let plantelMedico = '';
let turnoMedico = '';
let turnoPaciente = '';
let contadorPaciente = 0;
let divTurno = document.getElementById('divTurno');

const mostrarTarjetasMedicosFetch = async () => {
    let response = await fetch('data.json')
    let data = await response.json()
    plantelMedico = data;

    data.forEach((medico) =>{
        let {apellidoMedico: apellido,
            nombreMedico: nombre,
            especialidadMedico: especialidad} = medico;

        let tarjeta = document.createElement('div');
        let botonTurno = document.createElement('button');
        botonTurno.innerHTML = 'Seleccionar';
        botonTurno.setAttribute('class','botonTurno');
        tarjeta.setAttribute('class','tarjeta');
        
        mostrarTodosLosMedicos.append(tarjeta);
        tarjeta.innerHTML = `<h4>${apellido} ${nombre}</h4>
                            <img src="./img/perfil.png">
                            <p>${especialidad}</p>`
        mostrarTodosLosMedicos.appendChild(tarjeta)
        tarjeta.append(botonTurno)

        botonTurno.addEventListener('click', function () {
            turnoMedico = `${apellido} ${nombre}`;
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
            tarjeta.classList.add('tarjetaSeleccionada');
        })
    })
}

mostrarTarjetasMedicosFetch();

let mostrarTurno = document.createElement('h4');

const sinTurno = () => {
    if(turnoMedico == '' && turnoPaciente == '') {
    mostrarTurno.innerHTML = 'No selecciono un turno';
    divTurno.prepend(mostrarTurno);
    }
}

sinTurno();

let inputFiltrarMedico = document.getElementById('inputFiltrarMedico');
let a = inputFiltrarMedico.value;

const filtrarMedicos = () => {
    mostrarTodosLosMedicos.innerHTML = ``
    let medicosFiltrados = plantelMedico.filter((e) => {
    return e.apellidoMedico.includes(inputFiltrarMedico.value)});

    if(inputFiltrarMedico.value !== ''){
        medicosFiltrados.forEach((e) => {
            let {apellidoMedico: apellido,
                nombreMedico: nombre,
                especialidadMedico: especialidad} = e;
            
            let tarjetaFiltrada = document.createElement('div');
            let botonTurno = document.createElement('button');
            botonTurno.innerHTML = 'Seleccionar';
            botonTurno.setAttribute('class','botonTurno');
            tarjetaFiltrada.setAttribute('class','tarjeta');
            mostrarTodosLosMedicos.append(tarjetaFiltrada);
            tarjetaFiltrada.innerHTML += `<h4>${apellido} ${nombre}</h4>
                                            <img src="./img/perfil.png">
                                            <p>${especialidad}</p>`
            mostrarTodosLosMedicos.appendChild(tarjetaFiltrada)
            tarjetaFiltrada.append(botonTurno)

            botonTurno.addEventListener('click', function () {
                turnoMedico = `${apellido} ${nombre}`;
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
            })
    })
    }else {
        mostrarTarjetasMedicosFetch();
    }
}

inputFiltrarMedico.addEventListener('input',filtrarMedicos);

const guardarLocalStorage = () => {
    localStorage.setItem('Pacientes',JSON.stringify(arrPacientes))
}

const cargarLocalStorage = () => {
    arrPacientes = JSON.parse(localStorage.getItem('Pacientes')) || arrPacientes
}

cargarLocalStorage();

const mostrarTarjetasPacientes = () => {
    mostrarTodosLosPacientes.innerHTML = '';
    for (const e of arrPacientes) {

        let tarjeta = document.createElement('div');
        let botonTurno = document.createElement('button');
        botonTurno.innerHTML = 'Seleccionar';
        botonTurno.setAttribute('class','botonTurno')
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosPacientes.append(tarjeta);
        tarjeta.innerHTML = `<h4>${e?.apellidoPaciente} ${e?.nombrePaciente}</h4>
                            <img src="./img/perfil.png">
                            <p>Correo: <br>${e?.emailPaciente}</p>`
        mostrarTodosLosPacientes.appendChild(tarjeta)
        tarjeta.append(botonTurno)

        botonTurno.addEventListener('click', function () {
            turnoPaciente = `${e.apellidoPaciente} ${e.nombrePaciente}`;
            if(turnoMedico === ''){
                swal.fire('Seleccione un medico')
            }else{
                swal.fire('Por favor seleccione una fecha');
            }
            divTurno.innerHTML = ``;
            visualizarTurno();
            contadorPaciente++;
        })
    }
}

mostrarTarjetasPacientes();

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
    }else if(camposFormulario.nombre && camposFormulario.apellido && camposFormulario.edad && camposFormulario.email) {
        arrPacientes.push(pacienteRegistro);
        guardarLocalStorage();
        formularioRegistro.reset();
        cargarLocalStorage();
        mostrarTarjetasPacientes();
        nombrePacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        apellidoPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        edadPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto'); 
        emailPacienteRegistro.classList.remove('valorCorrecto','valorIncorrecto');
        swal.fire('Paciente registrado exitosamente');
    }else{
        swal.fire('Uno o mas campos son incorrectos');
    }
}

let registroPaciente = document.getElementById('registrarPaciente');

registroPaciente.onclick = (e) => {
    e.preventDefault();
    registrarPaciente();

}

let botonFecha = document.getElementById('confirmarFecha');
let turnoFecha = '';

botonFecha.addEventListener('click', function () {
    turnoFecha = document.getElementById('fechaTurno').value;
    if(turnoMedico === '' && turnoPaciente === ''){
        swal.fire('Seleccione un medico y un paciente');
    }else if(turnoMedico === ''){
        swal.fire('Seleccione un medico');
    }else if(turnoPaciente === '') {
        swal.fire('Seleccione un paciente');
    }else if (turnoFecha === ''){
        swal.fire('Seleccione una fecha');
    }
    divTurno.innerHTML = ``;
    visualizarTurno();
})

let confirmarTurno = document.getElementById('confirmarTurno');

const visualizarTurno = () => {
    mostrarTurno.remove();
    let verTurno = document.createElement('div')
    verTurno.innerHTML =    `<p>Profesional: ${turnoMedico}</p>
                            <p>Paciente: ${turnoPaciente}</p>
                            <p>Fecha: ${turnoFecha}</p>
                            `
    divTurno.append(verTurno);
    if(turnoMedico !== '' && turnoPaciente !== '' && turnoFecha !== ''){
        confirmarTurno.classList.remove('oculto');
    }
}

let contadorTurno;
const traerContadorTurno = () => {
    if(localStorage.getItem('ContadorTurno')){
        contadorTurno = JSON.parse(localStorage.getItem('ContadorTurno'))
    }else{
        contadorTurno = 1;
    }
}

confirmarTurno.addEventListener('click', function () {
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
})

const expresiones = {
	texto: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
	edad: /^[0-9]{1,3}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const camposFormulario =  {
    nombre: false,
    apellido: false,
    edad: false,
    email: false
}

let inputs = document.querySelectorAll('#formulario input');

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

inputs.forEach((input) => {
    input.addEventListener('input',validarFormulario);
    input.addEventListener('blur',validarFormulario);
})