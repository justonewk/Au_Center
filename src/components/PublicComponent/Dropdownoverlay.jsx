import React from 'react';
import { Menu,  } from 'antd'

export var clicktag = ""
export var modeldata = {};

// 
export const setClickTag = (str) => {
    clicktag = str;
}
export const onVisibleChange = (e) => {
    // 点击显示时阻止
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
}
export const Dropdownoverlay = (Dropdownlist, current, name, onClickOperation, parentid) => {
    return (
        <Menu onClick={onClickOperation}>
	        {Dropdownlist.map(function(item, index) {

            return (
                <Menu.Item key={item.id + "-" + current + "-" + name + "-" + parentid} >
		          <span>{item.name}</span>
		        </Menu.Item>
            )
        })
        }
	        
	       </Menu>
    )
}

// export default Dropdownoverlay;