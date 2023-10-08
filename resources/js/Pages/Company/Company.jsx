import React from "react";

import classes from "./Company.module.css";

const Company = (props) => {
    console.log(props.data);
    return (
        <div className="container-fluid mb-6">
            <div className="bg-white rounded-md p-4">
                {props.data.profile.map((c) => (
                    <div className={classes.company} key={c.id}>
                        <div className={classes["company-title"]}>
                            {c.title}
                        </div>
                        <div className={classes["company-content"]}>
                            {c.desc.map((d) => (
                                <>
                                    <div className={classes.content} key={d.id}>
                                        {d.address}
                                    </div>
                                    <div className={classes.content} key={d.id}>
                                        {d.telp}
                                    </div>
                                    <div className={classes.content} key={d.id}>
                                        {d.fax}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                ))}
                <div className={`${classes.company} my-6`}>
                    <div className={classes["company-title"]}>
                        {props.data.business.title}
                    </div>
                    <div className={classes["company-content"]}>
                        {props.data.business.desc.map((b) => (
                            <div
                                className={`${classes.content} mb-2`}
                                key={b.id}
                            >
                                <span>{b.business}</span>
                                <div className={classes.list}>
                                    {b.sub_business.map((sb) => (
                                        <p key={sb.id}>{sb.name}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {props.data.contact.map((con) => (
                    <div className={classes.company} key={con.id}>
                        <div className={classes["company-title"]}>
                            {con.contact_to.type}
                        </div>
                        <div className={classes["company-content"]}>
                            <div className={classes.content}>
                                {con.contact_to.body}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Company;
