import { Session } from 'next-auth';
import React from 'react';

interface CardProps {
    session: Session;
}

const Card: React.FC<CardProps> = ({ session }) => (
    <div className="inline-block border border-gray-300 p-4 m-4">
        <h1 className='text-center'><b>Welcome {session?.user.name}, Lets Start Coding! &#128187;</b></h1>
        <br />
        <table className="border-collapse">
            <tbody>
                <tr>
                    <td className="py-2 pr-4"> Email </td>
                    <td className="py-2"> {session?.user.email} </td>
                </tr>
                <tr>
                    <td className="py-2 pr-4"> Username </td>
                    <td className="py-2"> {session?.user.username} </td>
                </tr>
                <tr>
                    <td className="py-2 pr-4"> Easy Solved </td>
                    <td className="py-2 text-green-600"> {session?.user.easy} </td>
                </tr>
                <tr>
                    <td className="py-2 pr-4"> Medium Solved </td>
                    <td className="py-2 text-yellow-300"> {session?.user.medium} </td>
                </tr>
                <tr>
                    <td className="py-2 pr-4"> Hard Solved </td>
                    <td className="py-2 text-red-500"> {session?.user.hard} </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default Card;