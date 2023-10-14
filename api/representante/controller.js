const storage = require('./storage')

function get_representante( filtro_representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_representante ) )
    })
}

function add_representante( representante ) {
    return new Promise((resolve, reject) => {
        if (!representante.cedula) {
            return reject('No hay datos suficientes.')
        }
        storage.add( representante )
        resolve( representante )        
    })
}

function update_representante( representante ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( representante )
        if (resultado) {
            return resolve( representante )
        } else {
            return reject('No existe el representante.')
        }
    })
}

function delete_representante( cedula ) {
    return new Promise((resolve, reject) => {
        storage.delete( cedula )
        resolve( cedula )
    })
}

module.exports = {
    get_representante,
    add_representante,
    update_representante,
    delete_representante
}