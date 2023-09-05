'use client'
import { GET_COMMENT } from '@/utility/queries';
import { getAllGuestCommentsByWeddingSessionId } from '@/utility/ucapan';
import React, { useEffect, useState } from 'react'

type getAllGuestCommentsByWeddingSessionId = {
    id: string;
    wedding_session: {
        id: string;
    };
    name: string;
    message: string;
    createdAt: string;
};

const Ucapan = () => {
    // const [message, setMessage] = useState<getAllGuestCommentsByWeddingSessionId[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const query = `
    //         query {
    //             getAllGuestCommentsByWeddingSessionId(wedding_session_id: "649007bdca091be7add3c440"){
    //                 id
    //                 wedding_session {
    //                   id
    //                 }
    //                 name
    //                 message
    //                 createdAt
    //               }
    //           }
    //       `;

    //         try {

    //             const masuk = await getAllGuestCommentsByWeddingSessionId(query);
    //             console.log(masuk);
    //             setMessage(masuk);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const weddingSessionId = '649007bdca091be7add3c440'; // Replace with an actual user ID
    const [comment, setComment] = useState<getAllGuestCommentsByWeddingSessionId[]>([]);

    useEffect(() => {
        async function fetchCommentData() {
            try {
                const variables = { weddingSessionId };
                const response = await getAllGuestCommentsByWeddingSessionId(GET_COMMENT, variables);
                setComment(response.data.getAllGuestCommentsByWeddingSessionId);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchCommentData();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {comment && comment.map((comment) => {
                        return (
                            <tr key={comment.id}>
                                <th>{comment.name}</th>
                                <td>{comment.message}</td>
                                <td>{comment.createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Ucapan