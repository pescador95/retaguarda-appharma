import React from 'react';
import {LinkArea, LinkIcon} from './styled'
import {useHistory, useLocation} from 'react-router-dom'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import SettingsIcon from '@material-ui/icons/Settings';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

function MenuItem({title, icon, link}) {

   const history = useHistory();
   const location = useLocation();

   let isActive = location.pathname === link;

   const handleClick = (e) => {
      e.preventDefault();
      history.push(link);
   }


  return (
     <LinkArea data-tip={title} data-for="tip-right" active={isActive} href={link} onClick={handleClick}>
        {title === 'Pedidos' && <ImportantDevicesIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Dashboard' && <DashboardIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Produtos' && <StoreIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Configurações' && <SettingsIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Categorias' && <DeveloperBoardIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Perfil' && <PersonIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
        {title === 'Enviar Notificação' && <NotificationsActiveIcon style={{ fontSize: 35, color:'#fff' }} color="inherit" />}
      </LinkArea>
  )
}

export default MenuItem;