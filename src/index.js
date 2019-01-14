import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import { getCookie } from './public/getCookie';
// import { getSwitch } from './public/getSwitch';
import { root } from './root';
import Page from './components/Page';
import Home from './components/Home/Home';
import UserManagement from './components/UserManagement/UserManagement';
import SubsystemManagement from './components/SubsystemManagement/SubsystemManagement';
import SubsystemDetail from './components/SubsystemManagement/SubsystemDetail'
import AddNewSubsystem from './components/SubsystemManagement/AddNewSubsystem'
import AddNewRole from './components/SubsystemManagement/AddNewRole'
import RoleDetail from './components/SubsystemManagement/RoleDetail'
import ChannelManagement from './components/ChannelManagement/ChannelManagement';
import LogManagement from './components/LogManagement/LogManagement';
import CooperationManagement from './components/CooperationManagement/CooperationManagement';
import SystemSetting from './components/SystemSetting/SystemSetting';
import Information from './components/Information/Information';
import Login from './components/pages/Login';
import UserManagementDetail from './components/UserManagement/UserManagementDetail/UserManagementDetail';
import BindDingDing from './components/BindDingDing/BindDingDing'
import BindingRecode from './components/BindDingDing/BindingRecode'

// const Switch = getSwitch();
const rootapp = root();
const test = (nextState, replace) => {
    var datavale = JSON.parse(getCookie("data"))
    console.log("datavaledatavaledatavale", datavale);
    if (datavale == null) {
        browserHistory.push('/');
    }
}



const routes = <Route path={rootapp} components={Page} history={browserHistory}>
{/*
Switch ? <IndexRedirect to="entrance" /> : <IndexRedirect to="login" />
*/}
<IndexRedirect to="login" />
    <Route path={'app'} component={App}>
        <IndexRedirect to="Home"/>
        <Route path={'Home'} component={Home} />
        <Route path={'SubsystemManagement'} component={SubsystemManagement} />
        <Route path={'SubsystemDetail'} component={SubsystemDetail} />
        <Route path={'AddNewSubsystem'} component={AddNewSubsystem} />
        <Route path={'AddNewRole'} component={AddNewRole} />
         <Route path={'RoleDetail'} component={RoleDetail} />
        <Route path={'UserManagement'} component={UserManagement} />
        <Route path={'UserManagementDetail'} component={UserManagementDetail} />
        <Route path={'ChannelManagement'} component={ChannelManagement} />
        <Route path={'LogManagement'} component={LogManagement} />
        <Route path={'SystemSetting'} component={SystemSetting} />
        <Route path={'CooperationManagement'} component={CooperationManagement} />
        <Route path={'Information'} component={Information} /> 
        <Route path={'BindDingDing'} component={BindDingDing} />  
        <Route path={'BindingRecode'} component={BindingRecode} />  

    </Route>
     
    <Route path={'login'} components={Login} />
</Route>;

ReactDOM.render(
    <Router history={browserHistory}>
      {routes}
  </Router>,
    document.getElementById('root')
);
registerServiceWorker();