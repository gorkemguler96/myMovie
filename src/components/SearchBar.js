import React, {useState} from 'react';

function SearchBar({movies,deleteMovie,setInput}) {
    return (
        <div>
            <div className="form-row mt-3">
                <div className="col-12">
                    <input
                        onChange={(e)=>{setInput(e.target.value)}}
                        type="text" className={"form-control"}
                        placeholder={"Search a movie"}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
