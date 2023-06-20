'use client'
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchGraphQL } from './api';

type ThemeData = {
    id: string;
    name: string;
    email: string;
    password: string;
};

const page: NextPage = () => {
    const [themes, setThemes] = useState<ThemeData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            query {
                getAllUsers{
                    id
                    name
                    email
                    password
                }
            }
          `;

            try {

                const masuk = await fetchGraphQL(query);
                console.log(masuk.getAllUsers);
                setThemes(masuk.getAllUsers);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Users natkn</h1>
            <ul>
                {themes && themes.map((theme) => (
                    <li className='p-3 bg-green-500 m-3' key={theme.id}>
                        <p>Name: {theme.name}</p>
                        <p>Email: {theme.email}</p>
                        <p>Email: {theme.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default page