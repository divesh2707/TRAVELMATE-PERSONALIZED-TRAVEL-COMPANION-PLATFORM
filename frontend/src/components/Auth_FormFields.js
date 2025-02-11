import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const loginFields = [
    {
        label: 'Email Or Username',
        type: 'text',
        name: 'emailOrUsername',
        placeholder: 'Enter email or username',
        required: true,
        margin: '80px',
        icon: <FaUser/>
    },
    {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        margin: '145px',
        icon: <FaLock/>
    },
];

export const registerFields = [
    {
        label: 'Username',
        type: 'text',
        name: 'username',
        placeholder: 'Enter your username',
        required: true,
        margin: '145px',
        icon: <FaUser/>
    },
    {
        label: 'Email',
        type: 'email',
        name: 'email',
        placeholder: 'Enter your email',
        required: true,
        margin: '170px',
        icon: <FaEnvelope/>
    },
    {
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        margin: '145px',
        icon: <FaLock/>
    },
];
