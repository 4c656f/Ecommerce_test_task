import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';

type WithNavBarProps = {}

const WithNavBar: FC<WithNavBarProps> = (props: WithNavBarProps) => {

    const {} = props


    return (
        <div>
            {/*navbar*/}
            navbar


            <Outlet/>

        </div>
    );
};

export default WithNavBar;