import React from 'react';
import AdminNavbar from './AdminNavbar';
import ShowAllCategory from './ShowAllCategory';

const AdminHomePage = (props) => {
    return (
        <div>
            <AdminNavbar />
            <ShowAllCategory props={props}/>
        </div>
    );
}

export default AdminHomePage;
