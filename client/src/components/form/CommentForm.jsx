import React, { Component } from 'react'
import Blog from '../comment-section/Blog'

import axios from 'axios'
import io from "socket.io-client";
const endPoint = "http://127.0.0.1:5000/";

class CommentForm extends Component {

    constructor() {
        super();
        this.state = {
            fullName: '',
            email: '',
            comment: '',
            errors: {
                fullName: '',
                email: '',
                comment: '',
            },
            blogData: []
        };
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({ [name]: value });

    }

    fetchBlogData() {
        const socket = io(endPoint);
        socket.on("connected", (data) => {
            this.setState({ blogData: data })
        });
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/`)
            .then(res => {
                // console.log(res);
                // console.log(res.data.record)
                this.setState({ blogData: res.data.record })
            }).catch(error => {
                console.log(error)
            })
    }



    validateForm = () => {
        let errors = this.state.errors;

        errors.fullName = this.state.fullName.length === 0 ? "Please enter the name!" : ''

        if (this.state.email.length === 0) errors.email = "Please enter the email!"
        else if (!this.state.email.includes("@")) {
            errors.email = "Invalid email!"
            // console.log(this.state.email);
        }

        errors.comment = this.state.comment.length === 0 ? "Please enter the comments!" : ''

        this.setState({ errors });

        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            console.info('Valid Form')
            // console.log(this.state);
            const formData = {
                name: this.state.fullName,
                email: this.state.email,
                comments: this.state.comment
            }
            const header = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
            axios.post(`http://127.0.0.1:5000/`, formData, { headers: header })
                .then(res => {
                    if (res.inserted) {
                        this.fetchBlogData();
                    }
                }).catch(error => console.log(error))

            this.setState({ fullName: '', email: '', comment: '' })
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors, blogData } = this.state;
        return (
            <div className=''>
                <Blog data={blogData} backup={blogData}></Blog>
                <h5 className="underline">Leave a Comment</h5>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className='form-group'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type='text' name='fullName' className="form-control" value={this.state.fullName} onChange={this.handleChange} />
                        {errors.fullName.length > 0 ?
                            <span className='error'>{errors.fullName}</span> : ''}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' className="form-control" value={this.state.email} onChange={this.handleChange} />
                        {errors.email.length > 0 ?
                            <span className='error'>{errors.email}</span> : ''}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="comment">Comments</label>
                        <textarea name="comment" value={this.state.comment} className="form-control" onChange={this.handleChange} cols="20" rows="7"></textarea>
                        {errors.comment.length > 0 ?
                            <span className='error'>{errors.comment}</span> : ''}
                    </div>
                    <div className='submit'>
                        <button className="btn btn-info" style={{ backgroundColor: "cadetblue", color: "#fff" }}>Submit Comment</button>
                    </div>
                </form>
            </div>
        )
    }


}

export default CommentForm;