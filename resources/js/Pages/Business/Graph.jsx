import { Fragment } from "react";


const Graph = ({ dataGraph }) => {
    return (
        <Fragment>
            <svg viewBox="0 0 77 39.5" className="w-full h-full object-cover">
                <path d="M 6 7 L 6 32.5 70 32.5" className="transition-all duration-1000" fill="none" stroke="black" strokeWidth={0.5} />
                <path d="M 6 32 L 6 32.2 47 13" style={{ transition: '3s' }} fill="none" stroke="black" strokeWidth={0.5} strokeDasharray="1,1" />
                <text x="0" y="-1" fontFamily="Arial" fontSize="5" fill="blue" className="rotate-90 font-light opacity-100 -translate-x-0" style={{ transition: '1s', fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    { dataGraph[0] }
                </text>
                <text x="43" y="38" fontFamily="Arial" fontSize="5" fill="green" className="font-light opacity-100 translate-y-0" style={{ transition: '1s', fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    { dataGraph[1] }
                </text>
                <text x="52.2" y="13" fontFamily="Arial" fontSize="5" fill="red" className="font-light" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    { dataGraph[2] }
                </text>
                <image href="/assets/images/OLL_DESIGN.png" x="45" y="16" width="24" />
                <text x="10.8" y="28" fontFamily="Arial" fontSize="2" fill="black" className="font-light opacity-100" style={{ transition: '1s', fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    10
                </text>
                <circle cx="11.8" cy="29.5" r="1" fill="black" className="opacity-100" style={{ transition: '1s' }} />
                <text x="21.3" y="23" fontFamily="Arial" fontSize="2" fill="black" className="font-light" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    50
                </text>
                <circle cx="22.6" cy="24.5" r="1" fill="black" />
                <text x="39" y="14.7" fontFamily="Arial" fontSize="2" fill="black" className="font-light" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    100
                </text>
                <circle cx="40.8" cy="16.2" r="1" fill="black" />
                <text x="42" y="7.2" fontFamily="Arial" fontSize="3" fill="red" className="font-light" style={{ fontFamily: '"Onest", sans-serif', fontStyle: 'normal' }}>
                    1000 stores
                </text>
                <circle cx="61.4" cy="6.7" r="1" fill="red" />
            </svg>
        </Fragment>
    )
}

export default Graph;