import React, { useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
    Table,
    Radio,
    DatePicker,
    Upload,
    Skeleton
} from "antd";
import { fetch } from '@helper/fetch';


const { Option } = Select;


const Assign = (props) => {

    const onSearch = (val) => {
        console.log('search:', val);
    }


    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a recruiter"
            optionFilterProp="children"
            onChange={props.onChange}            
        >
            {props.lists.map((value, index) => (
                <Option value={value.email}>{value.name}</Option>
            ))}

        </Select>
    )
}

export default Assign;