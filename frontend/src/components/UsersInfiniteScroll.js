import { React, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios';

export default function UsersInfiniteScroll(props) {
    const [items, setItems] = useState([]);

    const [hasMore, sethasMore] = useState(true);

    const [page, setpage] = useState(2);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/users?page=1`)
            .then(res => {
                setItems(res.data);
                console.log(res.data);
            }).catch(error => {
            })
    }, []);

    const fetchUsers = async () => {
        const res = await fetch(
            `http://127.0.0.1:5000/users?page=${page}`
            // For json server use url below
            // `http://localhost:3004/comments?_page=${page}&_limit=20`
        );
        const data = await res.json();
        return data;
    };

    const fetchData = async () => {
        const usersFromServer = await fetchUsers();

        setItems([...items, ...usersFromServer]);
        if (usersFromServer.length === 0) {
            sethasMore(false);
        }
        setpage(page + 1);
    };

    return (
        <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="container">
                <div className="row m-2">
                    {items.map((item) => {
                        return <div key={item.id}>LOL</div>;
                    })}
                </div>
            </div>
        </InfiniteScroll>
    );
}