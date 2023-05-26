import ApiService from './ApiService'
import ApiPutuser from './ApiPutuser'
export async function apiGetCrmDashboardData(data) {
    return ApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data,
    })
}

export async function apiGetCrmCalendar() {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

//get Agent
export async function apiGetAgent(data) {
    return ApiService.fetchDataAg({
        data
    })
}

//get SubAgent
export async function apiGetSubAgent(data) {
    return ApiService.fetchSubAgentId({
        data
    })
}

//get SubAgent
export async function apiGetMemberSubAgent(data) {
    return ApiService.fetchDataSubMemberAg({
        data
    })
}


//get Admin
export async function apiGetCrmAdmin(data) {
    return ApiService.fetchDataAd({
        data
    })
}

//get Member
export async function apiGetCrmMember(data) {
    return ApiService.fetchDataMember({
        data
    })
}

//get Log_Member
export async function apiGetLogMember(data) {
    return ApiService.fetchLogMember({
        data
    })
}

//get Log_Edit_Member
export async function apiGetLogEditMember(data) {
    return ApiPutuser.fetchLogEdit({
        data
    })
}

export async function apiGetCrmCustomersStatistic(params) {
   return ApiService.fetchDataAg({
        params
    })
}

//PutAgent
export async function apPutAgent(data) {
    return ApiService.putDataAgent({
        data,
    })
}

//PutAdmin
export async function apPutAdmin(data) {
    return ApiService.putDataAdmin({
        data,
    })
}

//PutMember
export async function apPutMember(data) {
    return ApiService.putDataMember({
        data,
    })
}

//PutDeleteAgent
export async function apPutDeleteAgent(data, type) {
    return ApiPutuser.deleteData({
        data,
        type
    })
}

//PutDeleteAdmin
export async function apPutDeleteAdmin(data, type) {
    return ApiPutuser.deleteData({
        data,
        type
    })
}

//PutDeleteMember
export async function apPutDeleteMember(data, type) {
    return ApiPutuser.deleteData({
        data,
        type
    })
}

//PutPasswordAgent
export async function editPasswordSubAgent(data) {
    return ApiPutuser.putPasswordAgent({
        data
    })
}
//PutPasswordAgent
export async function editSubAgent(data) {
    return ApiPutuser.putSubAgent({
        data
    })
}

//AddAdmin
export async function AddAdmin(data) {
    return ApiService.addAdmin({
        data,
    })
}

//AddAgent
export async function apAddAgent(data) {
    return ApiService.addAgent({
        data,
    })
}

//AddMember
export async function apAddMember(data) {
    return ApiService.addMember({
        data,
    })
}

//Get จำนวน Data มาไว้ดูในหน้า Dashboard จำนวน ของ Admin Agent Member
export async function getCustomer() {
    return ApiService.getValusData()
}

export async function getCustomerValis(data) {
    return ApiService.getValusDataPost(data)
}

//Get CommissionGame
export async function getCommissionGame(data) {
    return ApiService.getCommission(data)
}

//Get CommissionMonthly
export async function getCommissionMonthly(data) {
    return ApiService.getCommissionMonthly(data)
}

// Get Log  Member Agent
export async function apiGetLogAgMember(params) {
    return ApiService.fetchDataAgMember({
        params
    })
}

export async function apiDeleteCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetCrmMails(params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail(params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
