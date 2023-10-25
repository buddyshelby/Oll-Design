import React, { Component } from 'react';
import './Contact.css';

class ContactUs extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="mb-8">
                        <label htmlFor="name" className="form-label">お名前 / NAME</label>
                        <input type="text" className="form-control" id="name" name="name" />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="email" className="form-label">メールアドレス / MAIL ADDRESS</label>
                        <input type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-8 text-left">
                        <label htmlFor="question" className="form-label">お問い合わせ / QUESTION</label>
                        <div className="d-flex align-items-center mb-2">
                            <input type="checkbox" id="checkbox1" name="checkbox1" className="mr-2" />
                            <label htmlFor="checkbox1">デザインのご依頼</label>
                        </div>
                        <div className="d-flex align-items-center mb-2"> 
                            <input type="checkbox" id="checkbox2" name="checkbox2" className="mr-2" />
                            <label htmlFor="checkbox2">気軽にご相談</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <input type="checkbox" id="checkbox3" name="checkbox3" className="mr-2" />
                            <label htmlFor="checkbox3">その他のご質問</label>
                        </div>
                    </div>
                    <div className="mb-3 text-left">
                        <div className="mb-3 text-left">
                            <textarea className="form-control message-box" id="message" name="message" rows="5"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-black">Submit</button>
                </form>
            </div>
        );
    }
}

export default ContactUs;
