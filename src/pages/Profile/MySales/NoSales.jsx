function NoSales({children}) {
    return (
        <div className="flex flex-col justify-center text-center gap-5 mt-40">
            <svg className="self-center" width="40" height="45" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 13H14.25M6.75 18H14.25M16.75 24.25H4.25C3.58696 24.25 2.95107 23.9866 2.48223 23.5178C2.01339 23.0489 1.75 22.413 1.75 21.75V4.25C1.75 3.58696 2.01339 2.95107 2.48223 2.48223C2.95107 2.01339 3.58696 1.75 4.25 1.75H11.2325C11.564 1.75007 11.8819 1.88181 12.1163 2.11625L18.8838 8.88375C19.1182 9.11812 19.2499 9.43601 19.25 9.7675V21.75C19.25 22.413 18.9866 23.0489 18.5178 23.5178C18.0489 23.9866 17.413 24.25 16.75 24.25Z" stroke="#18403C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {children}
            <h3>When you do, your sold items will live here</h3>
        </div>
    )
}

export default NoSales
