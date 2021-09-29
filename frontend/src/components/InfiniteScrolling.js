import { React, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios';
import UsersCards from './UsersCards'

export default function InfiniteScrolling(props) {
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    axios.defaults.baseURL = 'http://127.0.0.1:5000';

    useEffect(() => {
        axios.get(`/users?page=${page}&per_page=32`)
            .then(res => {
                let newUsers = res.data.users;
                setUsers([...users, ...newUsers]);
                console.log(res.data);

                if (newUsers.length === 0) {
                    setHasMore(false);
                }
            }).catch(error => {
                console.log(error);
            })
    }, [page]);

    return (
        <InfiniteScroll
            dataLength={users.length} //This is important field to render the next data
            next={() => setPage(page + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <UsersCards users={users} />
        </InfiniteScroll>
    );
}