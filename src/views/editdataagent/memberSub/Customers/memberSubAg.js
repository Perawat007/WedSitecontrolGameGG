import React, { useEffect, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import Customers from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import { injectReducer } from 'store/index'
import reducer from './store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from './store/dataSliceSubAgent'
import cloneDeep from 'lodash/cloneDeep'

injectReducer('crmMemSubAgent', reducer)
/** Example purpose only */
const MemberSubAgent = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const [id, setId] = useState('');
    const [IdAgent, setIdAgent] = useState([]);
    const [isClickedA, setIsClickedA] = useState(false);
    const [isClickedB, setIsClickedB] = useState(true);
    const [nameSub, setnameSub] = useState('');
   /* const tableData = useSelector((state) => state.crmMemSubAgent.data.customerList)
    console.log(tableData);*/
    /*const fetchData = (data) => {
         const newTableData = cloneDeep(tableData)
         newTableData.query = ''
         newTableData.pageIndex = 1
         newTableData.idUser = data.id;
         dispatch(getCustomers(newTableData))
     }*/

    /* const { pageIndex, pageSize, sort, query, total } = useSelector(
         (state) => state.crmCustomers.data.tableData
     )*/

    const BackPang = () => {
        setIsClickedA(true);
        setIsClickedB(false);
        navigate(`/editDataAgent`)
    }

    const h4Style = {
        color: isClickedB ? '#FF9933' : 'white',
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
    };

    const Style = {
        color: 'white',
        display: 'inline-block',
        marginRight: '10px',
    };

    useEffect(() => {
        const path = window.location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const pathA = window.location.pathname;
        const pathSegments = pathA.split('/');
        const rquestParam = { id: path }
        setId(rquestParam.id);
        setIdAgent(pathSegments[3])
        setnameSub(pathSegments[2])
        //fetchData(rquestParam)
    }, [location.pathname])

    return (

        <AdaptableCard className="h-full" bodyClass="h-full">
            <h4>Member... {nameSub} Id {id}</h4>
            <br/>
            <CustomersTableTools />
            
            <div>
                <h6 style={Style}>กลับ</h6>
                <a style={h4Style}onClick={BackPang}>SubAgent</a>
            </div>
            <br/>
            <Customers />
        </AdaptableCard>

    )
}

export default MemberSubAgent
