/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de Id
2 Obter o endereco do usuario pelo id
*/
// importamos um modulointerno do node.js

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    // quando der algum problema => reject(error)
    // quando sucess => resolve

    return new Promise(function resolveParams(resolve, reject) {

        setTimeout(function () {
           // return reject(new Error('deu ruim de verdade!'));

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolveParams(resolve, reject) {
        setTimeout(function () {
            return resolve({
                telefone: '123456',
                ddd: 11
                
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'prive',
            numero: 04
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

main()
async function main() {
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario();
        //const telefone = await obterTelefone(usuario.id);
        //const endereco = await obterEndereco(usuario.id);

        const resultado =  await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)

        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}),${telefone.telefone}
            Endereco: ${endereco.rua},${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch(error) {
        console.error('Deu ruim', error)
    }
}


/*
const usuarioPromise = obterUsuario()
// para manipular o sucesso usamosa função then
// para manipuçar erros, usamos o .catch
// usuario => telefone => telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
        .then(function (resultado) {
            const endereco = obterEnderecoAsync(resultado.usuario.id);
            return endereco.then(function resolverEndereco(result) {
                return {
                    usuario: resultado.usuario,
                    telefone: resultado.telefone,
                    endereco: result
                }
            })
        })
        .then(function(resultado) {
            console.log(`
                Nome: ${resultado.usuario.nome},
                Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
                Telefone: (${resultado.telefone.ddd}),${resultado.telefone.telefone}
         `)
        })
        .catch(function (resultado) {
            console.error('deu ruim', error)
        })
    })
/*
obterUsuario(function resolverUsuario(error, usuario) {

    if(error) {
        console.error('DEU RUIM EM USUARIO', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('DEU RUIM EM Telefone', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('DEU RUIM EM Telefone', error)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd}),${telefone.telefone}
            `)
        })
    })

});
//const telefone = obterTelefone(usuario.id);

//console.log('usuario', usuario)
//console.log('telefone', telefone)
/*
obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if(error1) {
        console.error('DEU RUIM EM TELEFONE', error)
        return;
    }
    obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
        if(erro2) {
            console.error('DEU RUIM EM TELEFONE', error)
            return; 
        }

        console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua},${endereco.numero}
            Telefone: (${telefone.ddd}),${telefone.telefone}
        `)
    })
})*/