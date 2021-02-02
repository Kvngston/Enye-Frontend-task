import { useState } from 'react'
import { Select, Divider, Checkbox } from 'antd'

const { Option } = Select
const CheckboxGroup = Checkbox.Group;

const Filter = ({ filterProfiles }) => {
    
    
    const [filter, setFilter] = useState(null)

    const handleFilterChange = value =>{
        setFilter(value)
        console.log(value)
        if(value === "Gender"){
            setOptions(genderOptions)
        }
        else if(value === "PaymentMethod"){
            setOptions(paymentOptions)
        }
    }

    const handleFilter = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
        filterProfiles(list, filter)
    };

    const onCheckAllChange = e => {
        const list = e.target.checked ? plainOptions : []
        setCheckedList(list);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
        filterProfiles(list, filter);
    };
    
    const genderOptions = ['Male', 'Female', 'Prefer to skip']
    const paymentOptions = ['check', 'cc', 'paypal', 'money order']
    
    const [plainOptions, setOptions] = useState([])

    const [checkedList, setCheckedList] = useState([]);

    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);



    return (
        <>
            <Select defaultValue="" onChange={handleFilterChange} style={{ width: 130}} className="select">
                <Option value="" disabled className="select">Filter by</Option>
                <Option value="Gender" className="select">Gender</Option>
                <Option value="PaymentMethod" className="select">Payment Method</Option>
            </Select>
            {
                filter ? 
                <>
                <Checkbox  indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <Divider />
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={handleFilter} />
                </> : null
            }
        </>
    )
}

export default Filter
