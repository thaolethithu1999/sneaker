import {
  CloseOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  removeFromCart,
  removeAll,
  getTotal,
} from "../redux/slice/CartSlice";
import { addListBill } from "../redux/slice/BillSlice";

const { Option } = Select;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartProduct);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const quan = useSelector((state) => state.cart.cartTotalQuantity);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart.length]);

  const columns = [
    {
      title: <div className="prosName">Image</div>,
      dataIndex: "img",
      render: (img) => {
        return (
          <div>
            <Image width={75} alt="table" src={img.mainImg} />
          </div>
        );
      },
    },
    {
      title: <div className="prosName">Product Name</div>,
      dataIndex: "name",
    },
    {
      title: <div className="prosName">Size</div>,
      dataIndex: "size",
    },
    {
      title: <div className="prosName">Quantity</div>,
      dataIndex: "quantity",
      // render: (quantity, row, index) => {
      //   let a = 0;
      //   return (
      //     <InputNumber
      //       min={1}
      //       max={10}
      //       defaultValue={quantity}
      //       onChange={(e) => (
      //         console.log(index),
      //         console.log("quan " + e),
      //         setNewPrice(row.price * e),
      //         setQuantity(e)
      //       )}
      //     />
      //   );
      // },
    },
    {
      title: <div className="prosName">Price</div>,
      dataIndex: "price",
      columnWidth: 100,
      render: (price) => {
        return (
          <div style={{ width: "70px" }}>
            <span id="price">
              {parseInt(price).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        );
      },
    },
    {
      title: <div className="prosName">Sum</div>,
      dataIndex: "price",
      render: (price, row) => {
        return (
          <div style={{ width: "70px" }}>
            {(price * row.quantity).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        );
      },
    },
    {
      title: (
        <Popconfirm
          title="Are you sure? Your cart will be empty."
          onConfirm={() => dispatch(removeAll())}
          onCancel={(e) => console.log(e)}
          okText="Yes"
          cancelText="No"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Tag
            color="#fa8c16"
            className="btnDeleteAll"
            //onClick={() => dispatch(removeAll())}
          >
            Remove All
          </Tag>
        </Popconfirm>
      ),
      dataIndex: "key",
      align: "center",
      render: (key) => {
        return (
          <Popconfirm
            title="This'll be remove from your cart!"
            onConfirm={() => dispatch(removeFromCart(key))}
            onCancel={(e) => console.log(e)}
            okText="Yes"
            cancelText="No"
          >
            <Tag
              color="orange"
              className="btnDelete"
              // onClick={() => dispatch(removeFromCart(key))}
            >
              Remove
            </Tag>
          </Popconfirm>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      quantity: quan,
      amount: amount,
    },
  ];

  const col = [
    {
      title: <div className="prosName">Quantity</div>,
      dataIndex: "quantity",
      align: "center",
      render: (quantity) => {
        return (
          <div>
            <span className="prosName">{quantity}</span>
          </div>
        );
      },
    },
    {
      title: <div className="prosName">SubTotal</div>,
      dataIndex: "amount",
      align: "center",
      render: (amount) => {
        return (
          <div>
            <span className="prosName">
              {parseInt(amount).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const [value, setValue] = useState(1);
  const [payment, setPayment] = useState("cod");

  const onChangeRadio = (e) => {
    const choice = e.target.value;
    console.log("radio checked: ", e.target.value);
    if (choice === 1) {
      document.getElementById("cod").style.display = "block";
      document.getElementById("credit").style.display = "none";
      setPayment("cod");
    } else {
      document.getElementById("cod").style.display = "none";
      document.getElementById("credit").style.display = "block";
      setPayment("credit");
    }
    setValue(e.target.value);
  };

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (values) => {
    console.log(values);
    console.log(values.customer.name);
    console.log(values.customer.email);
    console.log(values.customer.phone);
    console.log(values.customer.address);
    console.log(values.customer.otherRequest);
    const obj = [
      {
        ...values.customer,
        pay: payment,
        list: cart,
        sub: amount,
        quanity: quan,
      },
    ];
    console.log(obj);
    dispatch(addListBill(obj));
  };

  const validateMessages = {
    required: (
      <div>
        <p className="paraPart">Please fill it!</p>
      </div>
    ),
    types: {
      email: (
        <div>
          <p className="paraPart">
            It is not a valid email! Please make sure your email form like that:
            Ex: abc@gmail.com
          </p>
        </div>
      ),
      number: "${label} is not a valid number!",
      name: "please"
    },
  };

  return (
    <div className="block">
      <Row className="cartArea" gutter={[16, 16]}>
        <Col className="proCartInfo" span={16}>
          <h4 className="cartText">YOUR CART</h4>
          <Table
            //rowSelection={{ rowSelection }}
            columns={columns}
            dataSource={cart}
          />

          <Table
            columns={col}
            dataSource={data}
            style={{ width: "300px" }}
            pagination={false}
          />

          {/* <div>
            <h4 className="prosName">
              Total Quantity: <span className="totalDisplay">{quan}</span>
            </h4>
            <h4 className="prosName">
              Subtotal:{" "}
              <span className="totalDisplay">
                {amount.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </h4>
          </div> */}
        </Col>

        <Col className="customerInfo" span={8}>
          <div className="payment">
            <h4 className="cartText">PAYMENT METHODS</h4>
            <div className="customerPaymentInfo">
              <Radio.Group
                onChange={onChangeRadio}
                value={value}
                required
                defaultValue={1}
              >
                <Radio value={1}>
                  COD
                </Radio>
                <Radio value={2}>Credit Card</Radio>
              </Radio.Group>
              <div id="cod">
                <p className="paraPart">
                  Pay in cash when you receive your parcel <HeartOutlined />
                </p>
              </div>
              <div id="credit" style={{ display: "none" }}>
                <p className="paraPart">
                  Please provide your full name and phone number when you
                  transferring <HeartOutlined />
                </p>
                <h4 className="prosName">Bank: [Techcombank]</h4>
                <h4 className="prosName">Owner name: Mrs.T</h4>
                <h4 className="prosName">Account number: 88888888888</h4>
              </div>
            </div>
          </div>

          <div className="customer">
            <h4 className="cartText">CUSTOMER INFO</h4>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              className="customerPaymentInfo"
            >
              <Form.Item
                name={["customer", "name"]}
                rules={[{ required: true }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>

              <Form.Item
                name={["customer", "email"]}
                rules={[{ type: "email" }]}
                required={false}
              >
                <Input type="email" placeholder="email" />
              </Form.Item>

              <Form.Item
                name={["customer", "phone"]}
                rules={[{ required: true }]}
              >
                <Input placeholder="phone number" />
              </Form.Item>

              <Form.Item
                name={["customer", "address"]}
                rules={[{ required: true }]}
              >
                <Input.TextArea placeholder="address" />
              </Form.Item>

              <Form.Item name={["customer", "otherRequest"]}>
                <Input.TextArea placeholder="Other request here" value="" />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                <Button type="primary" htmlType="submit" className="btnPayment">
                  PURCHASE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
