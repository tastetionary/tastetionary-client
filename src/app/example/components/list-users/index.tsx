'use client';

import { useQuery } from '@tanstack/react-query';

interface User {
    id: number;
    name: string;
    email: string;
}
async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = (await res.json()) as User[];
    return users;
}

export default function ListUsers() {
    const { data } = useQuery({
        queryKey: ['hydrate-users'],
        queryFn: () => getUsers(),
    });

    return (
        <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
            {
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        gap: 20,
                    }}
                >
                    {data?.map(user => (
                        <div key={user.id} style={{ border: '1px solid #ccc', textAlign: 'center' }}>
                            <img
                                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                                alt={user.name}
                                style={{ height: 180, width: 180 }}
                            />
                            <h3>{user.name}</h3>
                        </div>
                    ))}
                </div>
            }
        </main>
    );
}
