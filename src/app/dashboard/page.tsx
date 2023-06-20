'use client'

import React, { useEffect, useState } from 'react'
import { digitalGift } from '../api/api';

type DigitalGift = {
    id: string;
    name: string;
    description: string;
    preview: string;
    price: number;
};

const Dashboard = () => {
    const [gift, setgift] = useState<DigitalGift[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            query {
                getAllDigitalGiftWeddingSessionById(wedding_session_id: "649007bdca091be7add3c440") {
                  id
                  name
                  description
                  preview
                  price
                }
              }
          `;

            try {

                const masuk = await digitalGift(query);
                console.log(masuk);
                setgift(masuk);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='px-8 w-full'>
            <h3>Hadiah Digital</h3>

            <div>
                <ul>
                    {gift && gift.map((gift) => (
                        <li className='p-3 rounded-lg bg-primary/30 my-3' key={gift.id}>
                            <p>Name: {gift.name}</p>
                            <p>Email: {gift.description}</p>
                            <p>preview: {gift.preview}</p>
                            <p>Price: {gift.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard