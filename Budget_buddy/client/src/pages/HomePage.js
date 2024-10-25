import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import Analytics from "../components/Analytics";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectedDate, setSelectdate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "description",
      dataIndex: "description",  
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);  
              setShowModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  

  
  // Fetching Transactions
  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setLoading(false);
        setAllTransection(res.data);
      } catch (error) {
        console.log(error);
        message.error("Issue with transactions");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  //  Submit for Add/Edit Transaction
  const handlesubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {
        // Update transaction
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userid: user._id,
          },
          transectionId: editable._id,  
        });
        message.success("Transaction updated successfully");
      } else {
        // Add new transaction
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction added successfully");
      }

      setShowModal(false);
      setEditable(null);
      setLoading(false);

      //  transactions after add/edit
      const res = await axios.post("/transections/get-transection", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setAllTransection(res.data);
    } catch (error) {
      setLoading(false);
      message.error("Transaction failed");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectdate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            <Select.Option value="income">Income</Select.Option>
          </Select>
        </div>
        <div className="switch-icons" >
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditable(null);
        }}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handlesubmit}
          initialValues={
            editable
              ? {
                  ...editable,
                  date: moment(editable.date),
                }
              : {}
          }
          key={editable ? editable._id : "new"}  
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input the amount!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type!" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
