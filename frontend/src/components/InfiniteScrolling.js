import { React, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios';
import UsersCards from './UsersCards'

export default function InfiniteScrolling(props) {
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    const [perPage, setPerPage] = useState(20); // Use this to set the number of items requested per page(request)

    axios.defaults.baseURL = 'http://127.0.0.1:5000';

    useEffect(() => {
        axios.get(`/users`, {
            params: {
              page: page,
              per_page: perPage
            }
          })
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