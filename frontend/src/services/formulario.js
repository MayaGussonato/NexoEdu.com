const API = "http://localhost:5177";

export async function enviarFormulario(dados) {

    const response = await fetch(`${API}/api/formulario`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(dados)

    });

    const resultado = await response.json();

    if(!response.ok){

        throw new Error(resultado.mensagem);

    }

    return resultado;

}