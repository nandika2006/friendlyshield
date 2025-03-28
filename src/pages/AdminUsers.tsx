
import React from 'react';
import UserTable from '@/components/admin/UserTable';

const AdminUsers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage all users and their security settings.</p>
      </div>
      
      <UserTable />
    </div>
  );
};

export default AdminUsers;
