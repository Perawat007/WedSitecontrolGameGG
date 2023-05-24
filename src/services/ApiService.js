import BaseService from './BaseService'

const baseURL = 'https://relaxtimecafe.fun/'
//const baseURL = 'http://localhost:5000/'
const ApiService = {
  //Login Admin
  loginAdmin(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'login/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: param.data.username,
          password: param.data.password
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
          const accessToken = data.token;
          localStorage.setItem('token', accessToken);
          resolve(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  },
  signOut(param) {
    return new Promise((resolve, reject) => {
      BaseService(param)
        .then((response) => {
          resolve(response)
        })
        .catch((errors) => {
          reject(errors)
        })
    });
  },

  //GetDataAdmin //Search ด้วย ส่ง name มา
  fetchDataAd(param) {
    return new Promise((resolve, reject) => {
      const tokenA = localStorage.getItem("token");
      if (tokenA !== null) {
        fetch(baseURL + 'list_admins', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenA}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: param.data.query,
            pageIndex: param.data.pageIndex,
            pageSize: param.data.pageSize
          })
        })
          .then(response => {
            if (response) {
              if (response.status === 401) {
                localStorage.removeItem('admin');
                localStorage.removeItem('token');
              }
              else {
                return response.json();
              }
            } else {
              throw new Error('Error: ' + response.statusText);
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            //window.location.reload();
            console.error('Error:', error);
          });
      }
    })
  },

  //GetDataAdmin //Search ด้วย ส่ง name มา
  fetchDataAgProfile(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'list_agent/' + param.data)
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },

  //GetDataSubAgent //Search ด้วย ส่ง name มา
  fetchDataAg(param) {
    return new Promise((resolve, reject) => {
      //const token = localStorage.getItem("token");
      fetch(baseURL + 'post/listSubAgent/'+ param.data.idUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: param.data.query,
          pageIndex: param.data.pageIndex,
          pageSize: param.data.pageSize
        })
      })
        .then(response => {
          if (response) {
            if (response.status === 401) {
              /*console.log(response.status);
              localStorage.removeItem('admin');
              localStorage.removeItem('token');*/
            }
            else {
              return response.json();
            }
          } else {
            throw new Error('Error: ' + response.statusText);
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          //window.location.reload();
          console.error('Error:', error);
        });
    })
  },

  //GetDataMember //Search ด้วย ส่ง name มา
  fetchDataMember(param) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem("token");
      fetch(baseURL + 'list_users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: param.data.query,
          idedit: 1,
          pageIndex: param.data.pageIndex,
          pageSize: param.data.pageSize
        })
      })
        .then(response => {
          if (response) {
            if (response.status === 401) {
              localStorage.removeItem('admin');
              localStorage.removeItem('token');
            }
            else {
              return response.json();
            }
          } else {
            throw new Error('Error: ' + response.statusText);
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          window.location.reload();
          console.error('Error:', error);
        });
    })
  },

  //putAgent
  putDataAgent(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'agent/' + param.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: param.data.username,
          name: param.data.name,
          status: param.data.status,
          contact_number: param.data.phoneNumber,
          credit: param.data.credit,
          idedit: param.data.idUsers,
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

  //putAdmin
  putDataAdmin(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'admin/' + param.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: param.data.username,
          idedit: param.data.idUsers,
          status: param.data.status,
          contact_number: param.data.phoneNumber,
          name: param.data.name,
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

  //putMember
  putDataMember(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'member/' + param.data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          member_code: param.data.member_code,
          name: param.data.name,
          idedit: param.data.idUsers,
          username: param.data.username,
          status: param.data.status,
          credit: param.data.credit,
          edittype: 'admin',
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

  //AddAgent
  addAgent(param) {
    return new Promise((resolve, reject) => {
      console.log(param);
      fetch(baseURL + 'post/singUpSubAgent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_agent: param.data.id_Agent,
          username: param.data.username,
          password: param.data.password,
          name: param.data.name,
          contact_number: param.data.contact_number,
          credit: param.data.credit,
          currency: param.data.currency,
          positiontype: param.data.positiontype,
          level: param.data.level
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
    });
  },

  //AddAdmin
  addAdmin(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param.data.name,
          username: param.data.username,
          password: param.data.password,
          contact_number: param.data.phoneNumber,
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
    });
  },

  //AddMember
  addMember(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'signupMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: param.data.agent_id,
          member_code: param.data.member_code,
          name: param.data.name,
          username: param.data.username,
          password: param.data.password,
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
    });
  },

  //GetLogMember //Search ด้วย ส่ง name มา
  fetchLogMember(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'user_play/user_lay/' + param.data.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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

  //GetLogMember //Search ด้วย ส่ง name มา
  fetchDataAgMember(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/MemberSubAgent/' + param.params.id.idLog, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param.params.query,
          pageIndex: param.params.pageIndex,
          pageSize: param.params.pageSize
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

  getValusData() {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'getallData')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },

  getValusDataPost(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/postGetallData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param,
        })
      })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.statusText);
          }
        }).then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },

  getCommission(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/commissionGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param,
        })
      })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.statusText);
          }
        }).then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },

  getCommissionMonthly(param) {
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/commissionMonthly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: param,
        })
      })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.statusText);
          }
        }).then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },

  fetchSubAgentId(param) { //dataSubAgent
    return new Promise((resolve, reject) => {
      fetch(baseURL + 'post/list_subAgent/' + param.data.id)
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => console.error(error))
    })
  },
}

export default ApiService


