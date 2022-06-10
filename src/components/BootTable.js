import React,{useEffect,useState} from 'react'
import axios from 'axios'
import logo from '../logo.png';
import loading from '../loading.gif';
import DataTable from 'react-data-table-component';

const BootTable=()=>{
const [shipmentDetail,setTPItem]=useState({});
const [shipmentNo,setShipmentNumber]=useState({});
const [posts,setTPItems]=useState({blogs:[]});

const getItem = (item) => {
        document.getElementById('oneItem').style = "visibility : show";
        setTPItem(JSON.parse(item.shipmentDetails).shipmentDetails);
        setShipmentNumber(JSON.parse(item.shipmentNumber));
};
const singleItemCls = {visibility: 'Hidden'};
const columns = [
    {
      name: 'Shipment No',
      selector: 'shipmentNumber',
      width: "100px"
    },
    {
      name: 'Processed Time',
      selector: 'timestamp',
      width: "180px",
    },
    {
        name: 'Action',
        cell: row =><div> 
        <div className='btnAlignLeft'> <button className='btnAlign' onClick={()=>getItem(row)} size="sm" variant="danger">View</button></div>
        <div className='btnAlignLeft'> <button className='btnAlign' onClick={()=>submitForm('complete')} size="sm" variant="danger">Complete</button></div>
        <div className='btnAlignLeft'> <button className='btnAlign' onClick={()=>submitForm('hold')} size="sm" variant="danger">Hold</button></div>
        </div>,
        width: "230px", 
    }
  ];
const submitForm=(status)=>{
  console.log(status);
  document.getElementById('oneItem').style = "visibility : hidden";
  /*var e = document.getElementById("dropdown-basic");
  var strUser = e.options[e.selectedIndex].value;
  if(strUser==0){
      alert("Select status and submit");
  }
  else{*/
  //}
  axios.put(`https://idatpcapi.azurewebsites.net/api/AutoBookTPChange/${shipmentNo}`, )
    .then(response =>response);
    getUserList();
}
const fetchPostList=async()=>{
    const {data}=await axios("http://tpchange.eastasia.azurecontainer.io/api/Transaction/")
    setTPItems({blogs:data})
    document.getElementById('oneItem').style = "visibility : hidden";
}

const conditionalRowStyles = [
    /*{
      when: row => row.processStatus.includes('PENDING'),
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.shipmentNumber.includes('216857430'),
      style: row => ({
        backgroundColor: row.shipmentNumber.startsWith('2') ? 'pink' : 'inerit',
      }),
    },*/
  ];

const [users, setUsers] = useState({});
const countPerPage = 6;
const [page, setPage] = useState(1);
const [totalRecord, setTotalRecord] = useState();


const [pendingRecord, setPendingRecord] = useState();
const [completedRecord, setCompletedRecord] = useState();
const getUserList=async()=>{
    document.getElementById('mainWrapper').style = "visibility : hidden";
    document.getElementById('overlay').style = "visibility : visible";
    await axios.get(`https://idatpcapi.azurewebsites.net/api/AutoBookTPChange/Get?page=${page}&per_page=${countPerPage}`).then(res => {
        setUsers(res.data.data);
        setTotalRecord(res.data.totalCount);
        setPendingRecord(res.data.pendingCount);
        setCompletedRecord(res.data.completedCount);
        document.getElementById('mainWrapper').style = "visibility : visible";
        document.getElementById('overlay').style = "visibility : hidden";
  })
}

useEffect(() => {
    getUserList();
  }, [page]);
    return (
      <section className="content">
        
    <div className="row" >
    <div className="col-md-3">
          <div className="sm-st clearfix">
              <span className="sm-st-icon st-green"><i className="fa fa-paperclip"></i></span>
              <div className="sm-st-info">
              <span>{totalRecord}</span>
              Total Tasks
              </div>
          </div>
      </div>

      <div className="col-md-3">
          <div className="sm-st clearfix">
              <span className="sm-st-icon st-red"><i className="fa fa-check-square-o"></i></span>
              <div className="sm-st-info">
              <span>{completedRecord}</span>
                  Completed Tasks                 
              </div>
          </div>
      </div>
      <div className="col-md-3">
          <div className="sm-st clearfix">
              <span className="sm-st-icon st-violet"><i className="fa fa-envelope-o"></i></span>
              <div className="sm-st-info">
              <span>{pendingRecord}</span>
                Pending Tasks
              </div>
          </div>
      </div>      
      <div className="col-md-3">
          <div className="sm-st clearfix">
              <span className="sm-st-icon st-blue"><i className="fa fa-envelope-o"></i></span>
              <div className="sm-st-info">
              <span>{pendingRecord}</span>
                In-Progress Tasks
              </div>
          </div>
      </div>   
    </div>
    
    <div className="row">
      <div id="overlay">
        <div className="loader"></div>
    </div>
        <div id ="mainWrapper">
            <div className="col-lg-6">
            <section className="Panel">
            <header className="panel-body  panel-heading">Transport Plan Shipments</header>
        <div id='allItem' className="table-responsive">
        <DataTable
            columns={columns}
            data={users}
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={totalRecord}
            paginationPerPage={countPerPage}
            paginationRowsPerPageOptions={[5,10,15]}
            paginationComponentOptions={{
                noRowsPerPage: true
            }}
            onChangePage={page => setPage(page)}
            conditionalRowStyles={conditionalRowStyles}
            /> 
        </div>
        </section>
        </div>
        <div id='oneItem' style={singleItemCls} className="col-md-6">
        <div className='formcls'>
        <div className='labelCommon'>
        <label className='lblField' >Booked By :</label>
        <label className='lblValue'>{shipmentDetail.bookedByCustomerName}</label>
        {/* <hr className="hrCls"/> */}
        {/* <input readOnly  name ="CustomerId" type="text" className="form-control" value={shipmentDetail.bookedByCustomerName}/> */}
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Booked Date:</label>
        <label className='lblValue'>{shipmentDetail.bookedDate}</label>
        {/* <hr className="hrCls"/> */}
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Booking Office:</label>
        <label className='lblValue'>{shipmentDetail.bookingOffice}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Business Team:</label>
        <label className='lblValue'>{shipmentDetail.businessTeam}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Business Unit:</label>
        <label className='lblValue'>{shipmentDetail.businessUnit}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Contact Name:</label>
        <label className='lblValue'>{shipmentDetail.contactName}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Customer Commodity :</label>
        <label className='lblValue'>{shipmentDetail.customerCommodity}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Date:</label>
        <label className='lblValue'>{shipmentDetail.date}</label>
        </div>
        <div className='labelCommon'> 
        <label className='lblField'>Date Label:</label>
        <label className='lblValue'>{shipmentDetail.dateLabel}</label>
        </div>
       
        <div className='labelCommon'>
        <label className='lblField'>Operator:</label>
        <label className='lblValue'>{shipmentDetail.operator}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Place Of Delivery:</label>
        <label className='lblValue'>{shipmentDetail.placeOfDelivery}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Place Of Receipt:</label>
        <label className='lblValue'>{shipmentDetail.placeOfReceipt}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Price Owner:</label>
        <label className='lblValue'>{shipmentDetail.priceOwner}</label>
        </div>
        <div className='labelCommon'>
        <label className='lblField'>Service Mode:</label>
        <label className='lblValue'>{shipmentDetail.serviceMode}</label>
        </div>
        <div className='btnAlignLeft'>
          <div className='checkBoxCommon'>
          <input type="checkbox" id="isReefer" name="isReefer" className="form-checkbox" disabled={true} value={shipmentDetail.isDangerous} />
          <label className="form-check-label">Is Dangerous</label>        
          </div>
          <div className='checkBoxCommon'>
          <input type="checkbox" id="isReefer" name="isReefer"className="form-checkbox" disabled={true} value={shipmentDetail.isOOG} />
          <label className="form-check-label">Is OOG</label>
          </div>
          <div className='checkBoxCommon'>
          <input type="checkbox" id="isReefer" name="isReefer" className="form-checkbox" disabled={true} value={shipmentDetail.isReefer} />
          <label className="form-check-label">Is Reefer</label>
          </div>
          <div className='checkBoxCommon'>
          <input type="checkbox" id="isReefer" name="isReefer" className="form-checkbox" disabled={true} value={shipmentDetail.isSpotBooking} />
          <label className="form-check-label">Is Spot Booking</label>
          </div>
        </div>
        {/* <div className='submitDiv'>
            <select id="dropdown-basic" className="form-select form-select-lg mb-3">
                <option value="0" defaultValue>In-Progress</option>
                <option value="1">Completed</option>
                <option value="2">On-Hold</option>
            </select>
            </div>
            <div className='submitBtn'>
            <input type="submit" className='btn btn-primary'  onClick={()=>submitForm()} size="sm" variant="danger" value="Submit" />
            </div>*/}
            </div>
        </div> 
        </div>
    </div>
   
</section>
    )
}

export default BootTable
