import React from 'react';
import {ShellBar, ShellBarItem, StandardListItem, Avatar, Input, Icon} from "@ui5/webcomponents-react";
import ImageUpload from "./ImageUpload.jsx";

const Sapui5Component = () => {
    return (
        <>
            <ShellBar
                logo={<img alt="SAP Logo" src="https://sap.github.io/ui5-webcomponents/images/sap-logo-svg.svg"/>}
                menuItems={<><StandardListItem data-key="1">Menu Item 1</StandardListItem><StandardListItem data-key="2">Menu Item 2</StandardListItem><StandardListItem data-key="3">Menu Item 3</StandardListItem></>}
                notificationsCount="10"
                onCoPilotClick={function _a(){}}
                onLogoClick={function _a(){}}
                onMenuItemClick={function _a(){}}
                onNotificationsClick={function _a(){}}
                onProductSwitchClick={function _a(){}}
                onProfileClick={function _a(){}}
                onSearchButtonClick={function _a(){}}
                primaryTitle="My Inventory App"
                profile={<Avatar><img src="https://sap.github.io/ui5-webcomponents-react/assets/Person-B7wHqdJw.png" /></Avatar>}
                searchField={<Input icon={<Icon interactive name="search"/>} showClearIcon/>}
                showCoPilot
                showNotifications
                showProductSwitch
            >
                <ShellBarItem onClick={function _a(){}}
                              count="3"
                              icon="add"
                              text="ShellBarItem"
                />
            </ShellBar>
        </>
    );
};

export default Sapui5Component;
