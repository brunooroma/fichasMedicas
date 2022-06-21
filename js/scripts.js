let titulo = document.getElementById('title');
let mostrarTodosLosMedicos = document.getElementById('mostrarTodosLosMedicos');
const divMedicos = document.getElementsByClassName('div');

const mostrarTarjetasMedicos = () => {
    arrMedicos.forEach((elemento) => {
        let tarjeta = document.createElement('div');
        tarjeta.setAttribute('class','tarjeta');
        mostrarTodosLosMedicos.append(tarjeta);
        let apellido = document.createElement('h4');
        apellido.innerText = `Profesional: ${elemento.apellidoMedico} ${elemento.nombreMedico}`;
        let matricula = document.createElement('p');
        matricula.innerText = (elemento.matriculaMedico);

        tarjeta.append(apellido,matricula)
    })
}

mostrarTarjetasMedicos();

