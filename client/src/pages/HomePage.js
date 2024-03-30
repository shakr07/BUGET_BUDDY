import React, { useState,useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import {Modal,Form,Input, Select,message, Table,DatePicker} from "antd"; 
import axios from 'axios'; 
import Spinner from "../components/Spinner";
import moment from "moment";
const {RangePicker}  =DatePicker;
const HomePage = () => {
    const [showModal,setShowModal]=useState(false);
    const [loading,setLoading]=useState(false);
  const [allTransection, setAllTransection]=useState([]);
  const [frequency,setFrequency]=useState('7');
  const [selectedDate,setSelectdate]=useState([]);
//table data
const columns=[
  {
    title:'Date',
    dataIndex:'date',
    render:(text)=><span>{moment(text).format('YYYY-MM-DD')}</span>
  },
  {
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Category',
    dataIndex: 'category'
  },
  {
    title: 'Reference',
    dataIndex: 'reference'
  },
  {
    title: 'Actions',
    
  },
]
   
    //useEffect hook
    useEffect(()=>{
      //getall transaction
      const getAllTransaction = async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          setLoading(true)
          const res = await axios.post('/transections/get-transection', {
            userid: user._id,
            frequency,
            selectedDate,
          });
          setLoading(false);
          setAllTransection(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
          message.error('Issure with transactions');
        }
      };
     getAllTransaction();
    },[frequency,selectedDate])
  const handlesubmit = async (values) => {
    try {
     const user=JSON.parse(localStorage.getItem('user'))
     setLoading(true)
      await axios.post('/transections/add-transection',{...values,userid:user._id})
     setLoading(false);
     message.success('Transacton successfull');
     setShowModal(false); 
    }
    catch (error) {
     setLoading(false)
     message.error('failed to transaction')
    }
  };
    return (
        <Layout>
          {loading&&<Spinner/>}
           <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 year</Select.Option>
              <Select.Option value="custom">custom</Select.Option>
            </Select>
            {frequency==='custom'&&(<RangePicker 
            value={selectedDate}
            onChange={(values)=>
            setSelectdate(values)}
            />  
          )}
          </div>
            <div>
                <button className="btn btn-primary"
                onClick={()=>{
                    setShowModal(true);
                }}
                >Add New</button>
            </div>
            </div>
            <div className="content">
            <Table columns={columns} dataSource={allTransection}/>
            </div>
            <Modal title="Add transaction " open={showModal} onCancel={()=>
            setShowModal(false)}
           footer={false}
             >
 
            <Form Layout="vertical" onFinish={handlesubmit}>
             <Form.Item label="Amount" name="amount">
                <Input type="text"/>    
             </Form.Item>
             <Form.Item label="type" name="type">
             <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option> 
             </Select>
             </Form.Item>
                    <Form.Item label="Category" name="category">
             <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                 <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">TAX</Select.Option>  
             </Select>
             </Form.Item>
             <Form.Item label="Date" name="date">
               <Input type="date" />
             </Form.Item>
             <Form.Item label="Refrence" name="refrence">
               <Input type="text" />
             </Form.Item>
               <Form.Item label="Description" name="description">
                 <Input type="text" />
                </Form.Item>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">{" "}SAVE</button>
                </div>
            </Form>
            </Modal>  
        </Layout>
    );
};

export default HomePage;
