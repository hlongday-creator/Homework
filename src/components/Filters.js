import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { priorFilter, searchFilter, statusFilter } from "../redux/actions";
const { Search } = Input;

export default function Filters() {
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPrior, setFilterPrior] = useState([])
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchFilter(e.target.value))
  };
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value)
    dispatch(statusFilter(e.target.value))
  }

  const handlePriorChange = (value) => {
    setFilterPrior(value)
    dispatch(priorFilter(value))
  }
  return (
    <Row justify="center">
      <Col span={24} xs={48}>
        <Typography.Paragraph className="mt-3 mb-1 font-bold">
          Search
        </Typography.Paragraph>
        <Search
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search here"
        />
      </Col>
      <Col sm={24} xs={48}>
        <Typography.Paragraph className="mt-3 font-bold text-center mg-1 xxs:text-left">
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value = {filterStatus} onChange={handleStatusChange}>
          <Radio value="all">All</Radio>
          <Radio value="completed">Completed</Radio>
          <Radio value="pending">Pending</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24} xs={48} >
        <Typography.Paragraph className="mt-3 font-bold mg-1">
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          style={{ width: "100%" }}
          value = {filterPrior}
          onChange={handlePriorChange}
        >
          <Select.Option value="High" label="High">
            <Tag color="red">High</Tag>
          </Select.Option>
          <Select.Option value="Medium" label="Medium">
            <Tag color="blue">Medium</Tag>
          </Select.Option>
          <Select.Option value="Low" label="Low">
            <Tag color="gray">Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
}
