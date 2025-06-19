import React, { useState } from "react"

export default function SearchComponent({ searchTerm, setSearchTerm, handleSearch }) {

    const handleEnter = (event) => {
        if (event.key == 'Enter') {
            handleSearch()
        }
    }
    return (
        <>
            <div className="search-bar" style={{ width: 300 }}>
                <input type="text" placeholder="Search for..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(event) => handleEnter(event)}
                />
            </div>
        </>
    )
}