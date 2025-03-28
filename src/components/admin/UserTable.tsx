
import React, { useState } from 'react';
import { 
  Shield, 
  Edit, 
  Trash, 
  Search, 
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  XCircle,
  UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/toast';

// Mock user data
const initialUsers = [
  { 
    id: 1, 
    username: 'admin', 
    email: 'admin@example.com', 
    role: 'Admin', 
    status: 'Active',
    lastLogin: '2023-10-05T10:30:00',
    macAddress: 'AA:BB:CC:DD:EE:FF'
  },
  { 
    id: 2, 
    username: 'user1', 
    email: 'user1@example.com', 
    role: 'User', 
    status: 'Active',
    lastLogin: '2023-10-04T16:45:00',
    macAddress: '11:22:33:44:55:66'
  },
  { 
    id: 3, 
    username: 'user2', 
    email: 'user2@example.com', 
    role: 'User', 
    status: 'Inactive',
    lastLogin: '2023-09-28T09:15:00',
    macAddress: 'AB:CD:EF:12:34:56'
  },
  { 
    id: 4, 
    username: 'support', 
    email: 'support@example.com', 
    role: 'Support', 
    status: 'Active',
    lastLogin: '2023-10-05T11:20:00',
    macAddress: 'FF:EE:DD:CC:BB:AA'
  },
  { 
    id: 5, 
    username: 'user3', 
    email: 'user3@example.com', 
    role: 'User', 
    status: 'Blocked',
    lastLogin: '2023-08-15T14:30:00',
    macAddress: '98:76:54:32:10:AB'
  },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const refreshUsers = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "User list refreshed",
        description: "The user list has been updated with the latest data.",
      });
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been removed from the system.",
    });
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } 
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    const newStatus = targetUser?.status === 'Active' ? 'deactivated' : 'activated';
    
    toast({
      title: `User ${newStatus}`,
      description: `The user has been ${newStatus} successfully.`,
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>
        <Button 
          onClick={refreshUsers} 
          disabled={isLoading}
          className="w-full sm:w-auto btn-glow"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Users
            </>
          )}
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableCaption>List of all registered users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="group hover:bg-muted/50">
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === 'Admin' ? 'default' : 'secondary'}
                      className={user.role === 'Admin' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {user.role === 'Admin' && <Shield className="h-3 w-3 mr-1" />}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'Active' 
                          ? 'outline' 
                          : user.status === 'Inactive' 
                            ? 'secondary' 
                            : 'destructive'
                      }
                      className={
                        user.status === 'Active' 
                          ? 'border-emerald-500 text-emerald-500' 
                          : user.status === 'Inactive' 
                            ? 'text-amber-500' 
                            : ''
                      }
                    >
                      {user.status === 'Active' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {user.status === 'Inactive' && <XCircle className="h-3 w-3 mr-1" />}
                      {user.status === 'Blocked' && <XCircle className="h-3 w-3 mr-1" />}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.lastLogin)}</TableCell>
                  <TableCell>
                    <code className="px-1 py-0.5 bg-muted rounded text-xs font-mono">
                      {user.macAddress}
                    </code>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          <UserCog className="h-4 w-4 mr-2" />
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
