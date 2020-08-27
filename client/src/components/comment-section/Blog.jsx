import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './Blog.css'

const endPoint = "http://127.0.0.1:5000/";
const options = ["name", "email", "date"]

const Blog = (props) => {
    const [response, setResponse] = useState([]);
    let socketData = response.length > 0 ? response : props.data;
    console.log(response);
    useEffect(() => {
        const socket = io(endPoint);
        socket.on("connected", (data) => {
            setResponse(JSON.parse(data))
        });
    }, []);

    const sortTheData = (event) => {
        const value = event.target.value;
        if (value === "date") {
            socketData.sort((a, b) => (new Date(a[value]) < new Date(b[value])) ? 1 : (new Date((b[value]) < new Date(a[value])) ? -1 : 0));
        } else {
            let email = []
            socketData.forEach(element => {
                email.push(element[value]);
            });
            console.log(email.sort())

            socketData.sort((a, b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0));
        }
        setResponse([...socketData])
    };

    return (
        <div>
            <div className="blog-title overflow-hidden">
                <h5 className="underline mt-4 float-left">Comments</h5>
                <div className="form-group float-right w-40">
                    <select className="form-control" onChange={sortTheData}>
                        <option value="">sort By</option>
                        {options.map(ele => { return <option value={ele}>{ele}</option> })}
                    </select>
                </div>
            </div>
            <div className="blog-wrapper mb-5 mt-3">
                {
                    socketData.map((res, index) => (
                        <div key={index} className="col-sm-12 blog-box overflow-hidden">
                            <div className="box-wrapper">
                                <div className="col-sm-3 float-left pb-2">
                                    <p>{res.date}</p>
                                    <span className="pr-1">by</span><a className="pb-2" href={'mailto:' + res.email}>{res.name}</a>
                                </div>
                                <div className="col-sm-9 float-left user-box">
                                    <p>{res.comments}</p>
                                </div>

                            </div>
                        </div>
                    )
                    )
                }
            </div>

        </div>
    )
}



export default Blog;