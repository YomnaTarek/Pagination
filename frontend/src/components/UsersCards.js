import React from "react";

export default function UsersCards(props) {
    return(
        <div className="container">
                <div className="row m-2">
                    {props.users.map((user) => {
                        return (
                            <div key={user.id} className="col-sm-6 col-md-4 v my-2">
                                <div className="card shadow-sm w-100 border-danger mb-3" style={{ minHeight: 225 }}>
                                    <div className="card-body">
                                        <h5 className="card-title text-center h2">Id :{user.id} </h5>
                                        <h5 className="card-title text-center h2">
                                            Name: {user.name}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
    );
}