const model = require('./model')

function get_representante_legal(filtro_representante_legal) {
  return new Promise((resolve, reject) => {
    let filtro = {};
    if (filtro_representante_legal) {
      filtro = { cedula: filtro_representante_legal };
    }

    model
      .find(filtro)
      .populate({
        path: 'empresa_detalle',
        populate: {
          path: 'empresa',
          model: 'empresa',
        },
      })
      .exec()
      .then((data) => {
        const lista = data.map((elemento) => {
          const objeto = {
            id: elemento._id,
            cedula: elemento.cedula,
            nombre: elemento.nombre,
            apellido: elemento.apellido,
            email: elemento.email,
            domicilio: elemento.domicilio,
            telefono: elemento.telefono,
          };
          objeto.empresas = elemento.empresa_detalle.map((detalle) => {
            return {
              empresa: detalle.empresa.nombre,
              domicilio: detalle.empresa.domicilio,
            };
          });
          return objeto;
        });

        resolve(lista);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function add_representante( representante ) {
    representante.fecha_emision = new Date()

    const objeto = new model( representante )
    objeto.save()
}

async function update_representante( representante ) {
    const objeto = await model.findOne( {cedula: representante.cedula} )

    if ( objeto ) {

      objeto.cedula = representante.cedula
      objeto.nombre = representante.nombre
      objeto.apellido = representante.apellido
      objeto.email = representante.email
      objeto.domicilio = representante.domicilio
      objeto.telefono = representante.telefono
      
        return resultado = await objeto.save()
    } else {
        return null
    }
}

async function delete_representante( cedula ) {
    return await model.deleteOne({cedula: cedula})
}

module.exports = {
    add: add_representante,
    get: get_representante_legal,
    update: update_representante,
    delete: delete_representante
}