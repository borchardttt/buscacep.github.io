async function findPostalCode(cep){

const url = `https://viacep.com.br/ws/${cep}/json`

let value = await fetch(url)
  .then(response => {
    // console.log(response) 
    return response.json()
    })
    .catch((e) =>{ 
      return Error(e)
    })
    
  return value ;
}