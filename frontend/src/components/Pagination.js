import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let perPage = 20;
  axios.defaults.baseURL = 'http://127.0.0.1:5000';
  useEffect(() => {
    const getUsers = () => {
      axios.get(`/users?page=1&per_page=${perPage}`)
        .then((resp) => {
          setUsers(resp.data.users)
          setPageCount(resp.data.pages_count)
        }).catch((err) => {
          console.log(err);
        });
    };

    getUsers();
  }, [perPage]);

  const fetchUsers = (currentPage) => {
    axios.get(`/users?page=${currentPage}&per_page=${perPage}`)
      .then((resp) => {
        setUsers(resp.data.users)
        setPageCount(resp.data.pages_count)
      }).catch((err) => {
        console.log(err);
      });
    return users;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const nextPageUsers = await fetchUsers(currentPage);
    setUsers(nextPageUsers);
  };

  return (
    <div className="container">
      <div className="row m-2">
        {users.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100 border-danger mb-3" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id :{item.id} </h5>
                  <h5 className="card-title text-center h2">
                    Name: {item.name}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}
export default Pagination;