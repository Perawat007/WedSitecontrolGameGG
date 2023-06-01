
const baseURL = 'http://localhost:5000/'
//const baseURL = 'https://relaxtimecafe.fun/'
const ApiPutuser = {

     //data Delete
     deleteData(param) {
        return new Promise((resolve, reject) => {
          fetch( baseURL+'delete/'+ param.data, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: param.type,
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              window.location.reload();
            })
            .catch(error => {
              console.error(error);
            });
        })
    },

    //GetLogEdit //Search ด้วย ส่ง name มา
 fetchLogEdit(param) {
  return new Promise((resolve, reject) => {
  fetch( baseURL + 'logEdit/' + param.data.id.idLog,{
            method: 'POST',
            headers: {
             'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              typeLog: param.data.id.typeLog,
              pageIndex: param.data.pageIndex,
              pageSize: param.data.pageSize
            })
        })
        .then(response => {
            if (response) {
              return response.json();
            } else {
              throw new Error('Error: ' + response.statusText);
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        })
    },

     //putPasswordAgent
  putPasswordAgent(param) {
    return new Promise((resolve, reject) => {
      console.log(param);
      fetch(baseURL + 'post/resetPasswordAgent/' + param.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: param.data.password,
          newPassword: param.data.newPassword,

        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.error(error);
        });
    })
  },

  putSubAgent(param) {
    return new Promise((resolve, reject) => {
      console.log(param)
      fetch(baseURL + 'post/EditDataSubAgent/',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: param.data.id,
          username: param.data.username,
          password: param.data.passwordNew,
          name: param.data.name,
          contact_number: param.data.contact_number,
          credit: param.data.credit,
          currency: param.data.currency,
          rank: param.data.rank,
          level: param.data.level
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.error(error);
        });
    })
  },

  putPercentSubAgent(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/EditPercentSubAgent/',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id : param.id,
          dataPercent : param.data,
          dataActive : param.dataActive,
        })
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.error(error);
        });
    })
  },

}

export default ApiPutuser


