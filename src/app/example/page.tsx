import getQueryClient from '@/lib/react-query/getQueryClient';
import Hydrate from '@/lib/react-query/hydrate.client';
import { dehydrate } from '@tanstack/react-query';
import ListUsers from './components/list-users';
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

export default async function Example() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['hydrate-users'], getUsers);
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <ListUsers />
        </Hydrate>
    );
}
